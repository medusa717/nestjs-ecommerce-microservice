# Auth Microservice

## Overview

The Auth Microservice handles user authentication and authorization. It manages JWT tokens, user sessions, and provides secure access to other microservices.

## Features

- User authentication (login/logout)
- JWT token management
- Role-based access control
- Session management
- Integration with Users service

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

## Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=auth_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
```

## Running the Service

```bash
# Install dependencies
npm install

# Start the service
npm run start:dev
```

## Dependencies

- NestJS
- TypeORM
- PostgreSQL
- @nestjs/jwt
- @nestjs/passport
- passport-jwt
- @nestjs/microservices
