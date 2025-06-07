# Auth Microservice 🔐

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Auth Microservice is responsible for handling user authentication and authorization in our e-commerce platform. It manages JWT token generation, validation, and user session management.

## ✨ Features

- **Authentication**

  - JWT token generation and validation
  - User login and registration
  - Password hashing and validation
  - Session management

- **Authorization**

  - Role-based access control
  - Permission management
  - Token refresh mechanism

- **Security**
  - Password encryption
  - Request validation

## 🏗️ Architecture

```
Client → API Gateway → Auth Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Authentication Flow

1. Client sends credentials
2. Service validates credentials
3. JWT token is generated
4. Token is returned to client

## 📚 API Endpoints

### Authentication

```http
POST /auth/login
POST /auth/verify
GET  /auth/me
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=auth_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d

# Security
PASSWORD_SALT=10
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

### Docker

```bash
# Build Docker image
docker build -t auth-microservice .

# Run container
docker run -p 3001:3001 auth-microservice
```

## 📦 Dependencies

- **Core**

  - @nestjs/core
  - @nestjs/common
  - @nestjs/microservices
  - @nestjs/typeorm

- **Security**

  - @nestjs/jwt
  - @nestjs/passport
  - passport-jwt
  - bcrypt

- **Database**

  - typeorm
  - pg

- **Validation**
  - class-validator
  - class-transformer

## 📝 License

This project is licensed under the MIT License.
