# Users Microservice 👥

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Users Microservice manages user-related operations in our e-commerce platform. It handles account management functionalities.

## ✨ Features

- **User Management**

  - User registration

- **Security**
  - Data encryption
  - Input validation
  - Rate limiting
  - Access control

## 🏗️ Architecture

```
Client → API Gateway → Users Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### User Management Flow

1. Client requests user operation
2. Service validates request
3. Database operation performed
4. Response returned to client

## 📚 API Endpoints

### User Management

```http
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=users_db

# Security
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
docker build -t users-microservice .

# Run container
docker run -p 3002:3002 users-microservice
```

## 📦 Dependencies

- **Core**

  - @nestjs/core
  - @nestjs/common
  - @nestjs/microservices
  - @nestjs/typeorm

- **Database**

  - typeorm
  - pg

- **Validation**

  - class-validator
  - class-transformer

- **Security**
  - @nestjs/throttler
  - helmet

## 📝 License

This project is licensed under the MIT License.
