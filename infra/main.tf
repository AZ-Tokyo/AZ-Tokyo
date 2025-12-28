terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
  backend "gcs" {
    bucket = "terraform-state-az-tokyo"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ---------------------------------------------------------------------------------------------------------------------
# APIS
# ---------------------------------------------------------------------------------------------------------------------
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "sqladmin.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com"
  ])
  project            = var.project_id
  service            = each.key
  disable_on_destroy = false
}

# ---------------------------------------------------------------------------------------------------------------------
# SECRETS (DB PASSWORD)
# ---------------------------------------------------------------------------------------------------------------------
resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "google_secret_manager_secret" "db_password" {
  secret_id = "db-password"
  project   = var.project_id

  replication {
    auto {}
  }

  depends_on = [google_project_service.apis]
}

resource "google_secret_manager_secret_version" "db_password" {
  secret      = google_secret_manager_secret.db_password.id
  secret_data = random_password.db_password.result
}

resource "google_secret_manager_secret_iam_member" "secret_access" {
  secret_id = google_secret_manager_secret.db_password.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}

# ---------------------------------------------------------------------------------------------------------------------
# SERVICE ACCOUNT FOR CLOUD RUN
# ---------------------------------------------------------------------------------------------------------------------
resource "google_service_account" "cloud_run_sa" {
  account_id   = "cloud-run-sa"
  display_name = "Cloud Run Service Account"
  project      = var.project_id
}

resource "google_project_iam_member" "cloud_sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}

# ---------------------------------------------------------------------------------------------------------------------
# ARTIFACT REGISTRY
# ---------------------------------------------------------------------------------------------------------------------
resource "google_artifact_registry_repository" "repos" {
  for_each = var.service_names

  location      = var.region
  repository_id = each.key
  description   = "${each.key} docker repository"
  format        = "DOCKER"
  project       = var.project_id

  depends_on = [google_project_service.apis]
}

# ---------------------------------------------------------------------------------------------------------------------
# CLOUD SQL (POSTGRESQL)
# ---------------------------------------------------------------------------------------------------------------------
resource "google_sql_database_instance" "default" {
  name             = "az-tokyo-postgres"
  database_version = "POSTGRES_15"
  region           = var.region
  project          = var.project_id

  settings {
    tier = "db-f1-micro"

    ip_configuration {
        ipv4_enabled = true
    }
  }

  deletion_protection = false # Set to true for production

  depends_on = [google_project_service.apis]
}

resource "google_sql_database" "default" {
  name     = "app_db"
  instance = google_sql_database_instance.default.name
  project  = var.project_id
}

resource "google_sql_user" "default" {
  name     = "app_user"
  instance = google_sql_database_instance.default.name
  password = random_password.db_password.result
  project  = var.project_id
}

# ---------------------------------------------------------------------------------------------------------------------
# CLOUD RUN
# ---------------------------------------------------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "services" {
  for_each = var.service_names

  name     = each.key
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  project  = var.project_id

  template {
    service_account = google_service_account.cloud_run_sa.email

    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      dynamic "env" {
        for_each = each.key == "backend" ? {
          DB_HOST = "/cloudsql/${google_sql_database_instance.default.connection_name}"
          DB_USER = google_sql_user.default.name
          DB_NAME = google_sql_database.default.name
        } : {}
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = each.key == "backend" ? [1] : []
        content {
            name = "DB_PASSWORD"
            value_source {
                secret_key_ref {
                    secret  = google_secret_manager_secret.db_password.secret_id
                    version = "latest"
                }
            }
        }
      }
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.default.connection_name]
      }
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version
    ]
  }

  depends_on = [google_project_service.apis]
}

# Allow unauthenticated access (public)
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  for_each = var.service_names

  location = var.region
  project  = var.project_id
  name     = google_cloud_run_v2_service.services[each.key].name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
