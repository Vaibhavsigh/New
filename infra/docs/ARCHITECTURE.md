# Architecture Documentation

## Overview

This monorepo contains three main applications:

1. **Mobile App** (`apps/mobile`): React Native mobile application
2. **API Service** (`services/api`): Node.js/Express REST API
3. **Algorithm Service** (`services/algorithms`): Python Flask service for data processing

## System Architecture

```
┌─────────────────┐
│  Mobile App     │
│  (React Native) │
└────────┬────────┘
         │
         │ HTTPS/REST
         ▼
┌─────────────────────────────────────┐
│   Load Balancer (ALB)               │
└────────┬────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────────┐
│  API    │ │  Algorithm       │
│ Service │ │  Service         │
│(Node.js)│ │  (Python/Flask)  │
└────┬────┘ └────┬─────────────┘
     │           │
     └─────┬─────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌─────────┐
│ MongoDB │  │  Redis  │
└─────────┘  └─────────┘
```

## Technology Stack

### Frontend (Mobile)

- React Native
- TypeScript
- React Navigation
- Axios for API calls

### Backend (API Service)

- Node.js 18+
- Express.js
- TypeScript
- MongoDB with native driver
- Redis for caching and job queues
- JWT for authentication
- Winston for logging

### Backend (Algorithm Service)

- Python 3.11+
- Flask
- NumPy/Pandas for data processing
- scikit-learn for ML algorithms
- MongoDB for data persistence
- Redis for job queues

### Infrastructure

- Docker & Docker Compose for local development
- AWS ECS for container orchestration
- AWS RDS/DocumentDB for MongoDB
- AWS ElastiCache for Redis
- AWS S3 for object storage
- AWS CloudFront for CDN
- Terraform for IaC

### Development Tools

- Yarn 3 workspaces for monorepo management
- ESLint & Prettier for code quality
- Jest for testing
- Husky for git hooks
- GitHub Actions for CI/CD

## Data Flow

### User Authentication

1. User submits credentials to API service
2. API validates against MongoDB
3. JWT token is generated and returned
4. Mobile app stores token and includes in subsequent requests

### Data Processing

1. Mobile app sends data to API service
2. API validates and stores in MongoDB
3. API queues processing job in Redis
4. Algorithm service picks up job from queue
5. Processes data and stores results in MongoDB
6. Mobile app polls or receives webhook notification

## Security Considerations

- All API endpoints require authentication (except public routes)
- JWT tokens with expiration
- Rate limiting on all endpoints
- Helmet.js for security headers
- CORS configured for specific origins
- Environment variables for sensitive data
- AWS IAM roles for service permissions
- Encrypted database connections

## Scalability

- Horizontal scaling of API and Algorithm services via ECS
- Redis for distributed caching
- MongoDB replica sets for high availability
- CDN for static assets
- Auto-scaling based on CPU/memory metrics

## Monitoring

- CloudWatch for logs aggregation
- CloudWatch Metrics for performance monitoring
- CloudWatch Alarms for critical issues
- Application Performance Monitoring (APM) integration ready

## Local Development

See root README.md for local development setup using Docker Compose and Firebase emulators.
