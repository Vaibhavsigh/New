# Monorepo

Production-ready monorepo for mobile, Node.js API, and Python algorithm services.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

This monorepo contains:

- **Mobile App** (`apps/mobile`): React Native application for iOS and Android
- **API Service** (`services/api`): Node.js/Express REST API with TypeScript
- **Algorithm Service** (`services/algorithms`): Python Flask service for data processing
- **Shared Package** (`packages/shared`): Common utilities and types

## Project Structure

```
.
├── apps/
│   └── mobile/              # React Native mobile app
│       ├── src/
│       ├── android/
│       ├── ios/
│       └── package.json
├── services/
│   ├── api/                 # Node.js API service
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── algorithms/          # Python algorithm service
│       ├── src/
│       ├── Dockerfile
│       └── requirements.txt
├── packages/
│   └── shared/              # Shared utilities and types
│       ├── src/
│       └── package.json
├── infra/
│   ├── terraform/           # Infrastructure as Code
│   └── docs/                # Infrastructure documentation
├── .github/
│   └── workflows/           # CI/CD workflows
├── docker-compose.yml       # Local development environment
├── firebase.json            # Firebase emulator config
└── package.json             # Root package.json with workspaces
```

## Prerequisites

- **Node.js**: >= 18.0.0
- **Yarn**: >= 3.0.0 (install with `corepack enable`)
- **Python**: >= 3.11 (for algorithm service)
- **Docker**: >= 20.10 (for local development)
- **Docker Compose**: >= 2.0

### Optional for Mobile Development
- **Xcode**: Latest version (for iOS development)
- **Android Studio**: Latest version (for Android development)
- **CocoaPods**: Latest version (for iOS dependencies)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd monorepo
```

### 2. Install Dependencies

```bash
# Enable Yarn 3
corepack enable

# Install all workspace dependencies
yarn install
```

### 3. Set Up Environment Variables

```bash
# Copy example env files
cp .env.example .env
cp services/api/.env.example services/api/.env
cp services/algorithms/.env.example services/algorithms/.env
cp apps/mobile/.env.example apps/mobile/.env

# Edit .env files with your configuration
```

### 4. Start Infrastructure Services

```bash
# Start MongoDB, Redis, and LocalStack
yarn docker:up

# Or with logs
docker-compose up
```

### 5. Start Firebase Emulators (Optional)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Start emulators
yarn emulator
```

## Development

### Running All Services

```bash
# Start API and Algorithm services in development mode
yarn dev
```

### Running Individual Services

#### API Service

```bash
# Development mode with hot reload
yarn workspace @monorepo/api dev

# Build
yarn workspace @monorepo/api build

# Start production build
yarn workspace @monorepo/api start
```

#### Algorithm Service

```bash
cd services/algorithms

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
export FLASK_APP=src.app
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

#### Mobile App

```bash
# Start Metro bundler
yarn workspace @monorepo/mobile start

# Run on iOS
yarn workspace @monorepo/mobile ios

# Run on Android
yarn workspace @monorepo/mobile android
```

#### Shared Package

```bash
# Build
yarn workspace @monorepo/shared build

# Watch mode
yarn workspace @monorepo/shared dev
```

### Code Quality

```bash
# Lint all code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type check
yarn typecheck
```

## Testing

### Run All Tests

```bash
yarn test
```

### Run Tests with Coverage

```bash
yarn test --coverage
```

### Run Tests for Specific Workspace

```bash
# API tests
yarn workspace @monorepo/api test

# Shared package tests
yarn workspace @monorepo/shared test

# Mobile tests
yarn workspace @monorepo/mobile test

# Python tests
cd services/algorithms
pytest
```

### Watch Mode

```bash
yarn test:watch
```

## Docker

### Build Docker Images

```bash
# Build API service
docker build -t monorepo-api -f services/api/Dockerfile .

# Build Algorithm service
docker build -t monorepo-algorithms -f services/algorithms/Dockerfile .
```

### Run with Docker Compose

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Deployment

See [Infrastructure Documentation](./infra/docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

#### Prerequisites
- AWS CLI configured
- Terraform installed
- Docker installed

#### Steps

1. **Provision Infrastructure**

```bash
cd infra/terraform
terraform init
terraform plan -var="environment=production"
terraform apply -var="environment=production"
```

2. **Deploy via CI/CD**

Push to `main` branch to trigger automated deployment via GitHub Actions.

3. **Manual Deploy**

```bash
# Build and push API
docker build -t monorepo-api:latest -f services/api/Dockerfile .
docker tag monorepo-api:latest <ecr-repo>/monorepo-api:latest
docker push <ecr-repo>/monorepo-api:latest

# Build and push Algorithm service
docker build -t monorepo-algorithms:latest -f services/algorithms/Dockerfile .
docker tag monorepo-algorithms:latest <ecr-repo>/monorepo-algorithms:latest
docker push <ecr-repo>/monorepo-algorithms:latest

# Update ECS services
aws ecs update-service --cluster production-cluster --service api-service --force-new-deployment
aws ecs update-service --cluster production-cluster --service algorithms-service --force-new-deployment
```

## API Documentation

### API Service Endpoints

- `GET /health` - Health check
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user by ID

### Algorithm Service Endpoints

- `GET /health` - Health check
- `POST /api/algorithms/process` - Process data
- `GET /api/algorithms/status` - Service status

## Environment Variables

See `.env.example` for all required environment variables.

### Key Variables

- `MONGO_URI`: MongoDB connection string
- `REDIS_HOST`, `REDIS_PORT`: Redis configuration
- `JWT_SECRET`: Secret for JWT token generation
- `AWS_*`: AWS credentials for S3, etc.
- `FIREBASE_*`: Firebase configuration

## Scripts

### Root Scripts

- `yarn dev` - Start all services in development mode
- `yarn build` - Build all workspaces
- `yarn test` - Run all tests
- `yarn lint` - Lint all code
- `yarn format` - Format all code
- `yarn typecheck` - Type check TypeScript code
- `yarn clean` - Clean all build artifacts
- `yarn docker:up` - Start Docker services
- `yarn docker:down` - Stop Docker services

## Contributing

### Git Workflow

1. Create a feature branch from `develop`
2. Make changes and commit (Husky will run pre-commit hooks)
3. Push to remote and create a Pull Request
4. CI will run tests and checks
5. After approval, merge to `develop`
6. Periodically merge `develop` to `main` for releases

### Pre-commit Hooks

Husky runs the following checks before each commit:
- ESLint on staged files
- Prettier formatting
- Python black and flake8 (for .py files)

### Pre-push Hooks

Before pushing, Husky runs:
- TypeScript type checking
- All tests

### Commit Message Convention

Follow conventional commits format:
```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Troubleshooting

### Yarn Install Issues

```bash
# Clear cache and reinstall
yarn cache clean
rm -rf node_modules
yarn install
```

### Docker Issues

```bash
# Reset Docker environment
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Python Environment Issues

```bash
cd services/algorithms
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Mobile Build Issues

```bash
# iOS
cd apps/mobile/ios
pod deintegrate
pod install
cd ..

# Android
cd apps/mobile/android
./gradlew clean
cd ..

# Metro cache
yarn workspace @monorepo/mobile start --reset-cache
```

## Architecture

See [Architecture Documentation](./infra/docs/ARCHITECTURE.md) for detailed architecture information.

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
