# API Gateway 🚪

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The API Gateway serves as the central entry point for all client requests in our microservices architecture. It handles request routing, authentication, and provides a unified interface for clients to interact with various microservices.

## ✨ Features

- **Request Routing**

  - Intelligent routing to appropriate microservices
  - Request/response transformation

- **Security**

  - JWT-based authentication
  - Role-based authorization
  - Rate limiting
  - Request validation

- **Documentation**

  - Swagger/OpenAPI integration
  - Interactive API documentation
  - Request/response schemas
  - Authentication flows

## 🏗️ Architecture

```
Client Request → API Gateway → Microservices
     ↑              ↓
     └── Response ←─┘
```

### Communication Flow

1. Client sends request to API Gateway
2. Gateway validates and authenticates request
3. Request is routed to appropriate microservice
4. Response is transformed and returned to client

## 📚 API Endpoints

### 🔐 Authentication

```http
POST /auth/login
POST /auth/register
POST /auth/verify
GET  /auth/me
```

### 👥 Users

```http
GET    /users
GET    /users/:id
GET    /users/me
POST   /users
PUT    /users/:id
DELETE /users/:id
```

### 📦 Products

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### 🛒 Cart

```http
GET    /cart
POST   /cart/items
PUT    /cart/items/:itemId
DELETE /cart/items/:itemId
```

### 📝 Orders

```http
GET    /orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id
DELETE /orders/:id
```

### 🚚 Shipping

```http
GET    /shipping/:orderId
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h

# Rate Limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- Git

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
docker build -t api-gateway .

# Run container
docker run -p 3000:3000 api-gateway
```

## 📦 Dependencies

- **Core**

  - @nestjs/core
  - @nestjs/common
  - @nestjs/microservices
  - @nestjs/swagger

- **Security**

  - @nestjs/jwt
  - @nestjs/passport
  - passport-jwt

- **Validation**

  - class-validator
  - class-transformer

- **Utilities**
  - rxjs
  - reflect-metadata

## 📝 License

This project is licensed under the MIT License.
