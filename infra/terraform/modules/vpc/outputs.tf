output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = []  # Add actual subnet IDs
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = []  # Add actual subnet IDs
}
