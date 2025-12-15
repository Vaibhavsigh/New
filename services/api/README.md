# @monorepo/api

Node.js API service built with Express and TypeScript.

## Features

- Express.js REST API
- MongoDB integration
- Redis for caching and queues
- JWT authentication (scaffolded)
- Rate limiting
- Request logging
- Error handling middleware
- Health check endpoint

## Development

```bash
# Run in development mode
yarn workspace @monorepo/api dev

# Build
yarn workspace @monorepo/api build

# Start production build
yarn workspace @monorepo/api start

# Run tests
yarn workspace @monorepo/api test
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `MONGO_URI`: MongoDB connection string
- `REDIS_HOST`: Redis host
- `JWT_SECRET`: Secret for JWT tokens
- See `.env.example` for all variables

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
