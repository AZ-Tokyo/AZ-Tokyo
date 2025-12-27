terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "run_api" {
  project            = var.project_id
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifact_registry_api" {
  project            = var.project_id
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "artifact_registry_repositories" {
  for_each      = toset(var.artifact_registry_repositories)
  location      = var.region
  repository_id = each.key
  description   = "${each.key} docker repository"
  format        = "DOCKER"

  depends_on = [
    google_project_service.artifact_registry_api
  ]
}

module "cloud_run_service" {
  for_each = var.cloud_run_services

  source = "./modules/cloud_run"

  name       = each.value.name
  location   = var.region
  image      = each.value.image
  project_id = var.project_id

  depends_on = [
    google_project_service.run_api,
    google_project_service.artifact_registry_api
  ]
}
