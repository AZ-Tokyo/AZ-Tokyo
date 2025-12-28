terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
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
    "artifactregistry.googleapis.com"
  ])
  project            = var.project_id
  service            = each.key
  disable_on_destroy = false
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

  depends_on = [google_project_service.apis]
}

# ---------------------------------------------------------------------------------------------------------------------
# CLOUD RUN
# ---------------------------------------------------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "services" {
  for_each = var.service_names

  name     = each.key
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
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

resource "google_cloud_run_v2_service_iam_member" "public_access" {
  for_each = var.service_names

  location = var.region
  name     = google_cloud_run_v2_service.services[each.key].name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
