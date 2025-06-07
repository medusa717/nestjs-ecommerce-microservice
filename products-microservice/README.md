# Products Microservice 🛍️

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Products Microservice manages the product catalog in our e-commerce platform. It handles product information, categories, inventory, and pricing.

## ✨ Features

- **Product Management**

  - Product CRUD operations
  - Inventory tracking
  - Product variants

- **Performance**
  - Caching
  - Pagination
  - Search optimization
  - Image handling

## 🏗️ Architecture

```
Client → API Gateway → Products Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Product Management Flow

1. Client requests product operation
2. Service processes request
3. Database operation performed
4. Response returned to client

## 📚 API Endpoints

### Product Management

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3003
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=products_db
```

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL
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
docker build -t products-microservice .

# Run container
docker run -p 3003:3003 products-microservice
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

- **Cache**

  - @nestjs/cache-manager
  - cache-manager-redis-store

## 📝 License

This project is licensed under the MIT License.
