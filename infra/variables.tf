variable "project_id" {
  description = "The ID of the Google Cloud project."
  type        = string
}

variable "region" {
  description = "The Google Cloud region to deploy resources."
  type        = string
  default     = "asia-northeast1"
}

variable "cloud_run_services" {
  description = "A map of Cloud Run service configurations."
  type = map(object({
    name  = string
    image = string
  }))
  default = {
    frontend = {
      name  = "frontend"
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    },
    backend = {
      name  = "backend"
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    },
    db = {
      name  = "db"
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }
}

variable "artifact_registry_repositories" {
  description = "A list of names for the Artifact Registry repositories."
  type        = list(string)
  default     = ["frontend", "backend", "db"]
}
