#!/bin/bash

set -e

echo "🚀 Setting up monorepo..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be >= 18 (current: $NODE_VERSION)"
    exit 1
fi

echo "✅ Node.js version check passed"

# Enable Corepack
echo "📦 Enabling Corepack..."
corepack enable

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Setup environment files
echo "📝 Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
fi

if [ ! -f services/api/.env ]; then
    cp services/api/.env.example services/api/.env
    echo "✅ Created services/api/.env"
fi

if [ ! -f services/algorithms/.env ]; then
    cp services/algorithms/.env.example services/algorithms/.env
    echo "✅ Created services/algorithms/.env"
fi

if [ ! -f apps/mobile/.env ]; then
    cp apps/mobile/.env.example apps/mobile/.env
    echo "✅ Created apps/mobile/.env"
fi

# Setup Husky
echo "🐶 Setting up Husky..."
yarn prepare

# Build shared package
echo "🔨 Building shared package..."
yarn workspace @monorepo/shared build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env files with your configuration"
echo "2. Start infrastructure: yarn docker:up"
echo "3. Start development: yarn dev"
echo ""
