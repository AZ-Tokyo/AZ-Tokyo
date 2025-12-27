variable "name" {
  description = "The name of the Cloud Run service."
  type        = string
}

variable "location" {
  description = "The location of the Cloud Run service."
  type        = string
}

variable "image" {
  description = "The container image to deploy."
  type        = string
}

variable "project_id" {
  description = "The ID of the Google Cloud project."
  type        = string
}
