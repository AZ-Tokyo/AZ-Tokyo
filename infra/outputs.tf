output "cloud_run_service_urls" {
  description = "The URLs of the deployed Cloud Run services."
  value       = { for k, v in module.cloud_run_service : k => v.service_url }
}
