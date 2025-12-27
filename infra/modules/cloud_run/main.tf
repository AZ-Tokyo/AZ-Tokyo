resource "google_cloud_run_v2_service" "default" {
  name     = var.name
  location = var.location
  project  = var.project_id

  template {
    containers {
      image = var.image
    }
    annotations = {
      "run.googleapis.com/client-name" = "terraform"
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

resource "google_cloud_run_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  project  = google_cloud_run_v2_service.default.project
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
