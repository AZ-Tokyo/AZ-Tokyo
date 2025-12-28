variable "project_id" {
  description = "The ID of the Google Cloud project."
  type        = string
  default     = "836936420638"
}

variable "region" {
  description = "The Google Cloud region to deploy resources."
  type        = string
  default     = "asia-northeast1"
}

variable "service_names" {
  description = "List of service names to create (used for both Artifact Registry and Cloud Run)."
  type        = set(string)
  default     = ["frontend", "backend"]
}
