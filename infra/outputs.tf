output "repository_urls" {
  description = "The URLs of the Artifact Registry repositories."
  value       = { for k, v in google_artifact_registry_repository.repos : k => "${v.location}-docker.pkg.dev/${v.project}/${v.repository_id}" }
}

output "service_urls" {
  description = "The URLs of the deployed Cloud Run services."
  value       = { for k, v in google_cloud_run_v2_service.services : k => v.uri }
}