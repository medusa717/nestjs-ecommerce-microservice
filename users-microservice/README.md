# Users Microservice

## Overview

The Users Microservice manages user accounts, profiles, and authentication-related data. It provides user management functionality and integrates with the authentication service.

## Features

- User management (CRUD operations)
- User profile management
- Address management
- Integration with Auth service

## API Endpoints

### Users

- `GET /users` - Get all users (paginated)
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=users_db
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
- @nestjs/microservices
