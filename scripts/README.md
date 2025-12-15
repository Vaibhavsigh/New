# Helper Scripts

This directory contains helper scripts for common development tasks.

## Available Scripts

### setup.sh

Initial setup script that:

- Verifies Node.js version
- Enables Corepack
- Installs dependencies
- Creates environment files from examples
- Sets up Husky git hooks
- Builds shared package

Usage:

```bash
./scripts/setup.sh
```

### docker-build-all.sh

Builds all Docker images for the project.

Usage:

```bash
./scripts/docker-build-all.sh
```

This will build:

- `monorepo-api:latest` - API service
- `monorepo-algorithms:latest` - Algorithm service
