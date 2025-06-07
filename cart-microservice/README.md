# Cart Microservice 🛒

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Cart Microservice manages shopping cart functionality in our e-commerce platform. It handles cart operations, price calculations, and integrates with the Products service for real-time stock validation.

## ✨ Features

- **Cart Management**

  - Add/remove items
  - Update quantities
  - Price calculations

- **Integration**

  - Product service integration
  - Real-time stock validation
  - Price synchronization
  - User session management

## 🏗️ Architecture

```
Client → API Gateway → Cart Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Cart Flow

1. User adds item to cart
2. Service validates product availability
3. Cart is updated
4. Response returned to client

## 📚 API Endpoints

### Cart Management

```http
GET    /cart
POST   /cart
PUT    /cart
DELETE /cart
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3005
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cart_db
MONGODB_USER=admin
MONGODB_PASSWORD=password
```

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB
- Redis

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
docker build -t cart-microservice .

# Run container
docker run -p 3005:3005 cart-microservice
```

## 📦 Dependencies

- **Core**

  - @nestjs/core
  - @nestjs/common
  - @nestjs/microservices
  - @nestjs/mongoose

- **Database**

  - mongoose
  - mongodb

- **Cache**

  - @nestjs/cache-manager
  - cache-manager-redis-store

- **Validation**
  - class-validator
  - class-transformer

## 📝 License

This project is licensed under the MIT License.
