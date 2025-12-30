output "repository_urls" {
  description = "The URLs of the Artifact Registry repositories."
  value       = { for k, v in google_artifact_registry_repository.repos : k => "${v.location}-docker.pkg.dev/${v.project}/${v.repository_id}" }
}

output "service_urls" {
  description = "The URLs of the deployed Cloud Run services."
  value       = {
    backend  = google_cloud_run_v2_service.backend.uri
    frontend = google_cloud_run_v2_service.frontend.uri
  }
}

output "cloud_sql_connection_name" {
  description = "The connection name of the Cloud SQL instance to be used in connection strings."
  value       = google_sql_database_instance.default.connection_name
}
