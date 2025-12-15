# Deployment Guide

This document describes the deployment process for the monorepo services.

## Infrastructure as Code

We use Terraform for infrastructure provisioning. The infrastructure code is located in `infra/terraform/`.

### Prerequisites

1. Install Terraform (>= 1.0)
2. Configure AWS credentials
3. Create an S3 bucket for Terraform state (optional but recommended)

### Initial Setup

```bash
cd infra/terraform

# Initialize Terraform
terraform init

# Review planned changes
terraform plan -var="environment=dev"

# Apply infrastructure
terraform apply -var="environment=dev"
```

### Terraform Modules

- **vpc**: VPC, subnets, internet gateway, NAT gateway
- **ecs**: ECS cluster, task definitions, services
- **database**: RDS/DocumentDB for MongoDB
- **cache**: ElastiCache for Redis
- **storage**: S3 buckets

## CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Triggered on pull requests and pushes to main/develop
   - Runs linting, type checking, and tests
   - Builds Docker images

2. **Deploy Workflow** (`.github/workflows/deploy.yml`)
   - Triggered on pushes to main branch
   - Builds and pushes Docker images to ECR
   - Deploys to ECS

### Required Secrets

Configure these secrets in GitHub repository settings:

- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `MONGO_URI`: MongoDB connection string
- `REDIS_HOST`: Redis host
- `JWT_SECRET`: JWT secret key
- `FIREBASE_PRIVATE_KEY`: Firebase service account key
- `FIREBASE_CLIENT_EMAIL`: Firebase client email

## Manual Deployment

### API Service

```bash
# Build Docker image
docker build -t monorepo-api:latest -f services/api/Dockerfile .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag monorepo-api:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/monorepo-api:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/monorepo-api:latest

# Update ECS service
aws ecs update-service --cluster production-cluster --service api-service --force-new-deployment
```

### Python Algorithm Service

```bash
# Build Docker image
docker build -t monorepo-algorithms:latest -f services/algorithms/Dockerfile .

# Push to ECR
docker tag monorepo-algorithms:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/monorepo-algorithms:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/monorepo-algorithms:latest

# Update ECS service
aws ecs update-service --cluster production-cluster --service algorithms-service --force-new-deployment
```

### Mobile App

Mobile app deployment is handled separately through platform-specific stores:

#### iOS (App Store)

```bash
cd apps/mobile/ios
fastlane ios release
```

#### Android (Play Store)

```bash
cd apps/mobile/android
fastlane android release
```

## Environment Configuration

### Development

- Uses local Docker Compose setup
- Firebase emulators
- LocalStack for AWS services

### Staging

- Deployed to AWS ECS
- Uses staging database instances
- Reduced scaling configuration

### Production

- Deployed to AWS ECS with auto-scaling
- Production database instances with backups
- CloudFront CDN for static assets
- Multi-AZ deployment for high availability

## Monitoring and Logging

- **CloudWatch**: Application logs and metrics
- **CloudWatch Alarms**: Alert on critical metrics
- **X-Ray**: Distributed tracing (optional)

## Rollback Procedure

If a deployment causes issues:

```bash
# Rollback ECS service to previous task definition
aws ecs update-service --cluster production-cluster --service api-service --task-definition <previous-task-def>
```

## Database Migrations

Run database migrations before deploying new code:

```bash
# For MongoDB migrations
yarn workspace @monorepo/api migrate
```
