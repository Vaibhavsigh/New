output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "ecs_cluster_name" {
  description = "ECS Cluster name"
  value       = module.ecs.cluster_name
}

# Add more outputs as needed
# output "api_endpoint" {
#   description = "API endpoint URL"
#   value       = module.ecs.api_endpoint
# }
