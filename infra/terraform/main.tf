terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment and configure for remote state
  # backend "s3" {
  #   bucket         = "monorepo-terraform-state"
  #   key            = "production/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "terraform-lock"
  # }
}

provider "aws" {
  region = var.aws_region
}

# VPC and Networking
module "vpc" {
  source = "./modules/vpc"

  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

# ECS Cluster for API and Algorithm services
module "ecs" {
  source = "./modules/ecs"

  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  public_subnet_ids  = module.vpc.public_subnet_ids
}

# RDS for MongoDB (or use DocumentDB)
# module "database" {
#   source = "./modules/database"
#   
#   environment = var.environment
#   vpc_id      = module.vpc.vpc_id
#   subnet_ids  = module.vpc.private_subnet_ids
# }

# ElastiCache for Redis
# module "cache" {
#   source = "./modules/cache"
#   
#   environment = var.environment
#   vpc_id      = module.vpc.vpc_id
#   subnet_ids  = module.vpc.private_subnet_ids
# }

# S3 buckets
# module "storage" {
#   source = "./modules/storage"
#   
#   environment = var.environment
# }
