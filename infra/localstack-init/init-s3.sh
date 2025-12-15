#!/bin/bash

echo "Initializing LocalStack S3..."

# Wait for LocalStack to be ready
until aws --endpoint-url=http://localhost:4566 s3 ls; do
  echo "Waiting for LocalStack..."
  sleep 2
done

# Create S3 buckets
aws --endpoint-url=http://localhost:4566 s3 mb s3://monorepo-uploads
aws --endpoint-url=http://localhost:4566 s3 mb s3://monorepo-backups

echo "LocalStack S3 initialized successfully"
