#!/bin/bash

set -e

echo "🐳 Building Docker images..."

# Build API service
echo "Building API service..."
docker build -t monorepo-api:latest -f services/api/Dockerfile .

# Build Algorithm service
echo "Building Algorithm service..."
docker build -t monorepo-algorithms:latest -f services/algorithms/Dockerfile .

echo ""
echo "✅ All Docker images built successfully!"
echo ""
echo "Images:"
echo "  - monorepo-api:latest"
echo "  - monorepo-algorithms:latest"
echo ""
