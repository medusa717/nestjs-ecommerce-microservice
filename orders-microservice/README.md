# Orders Microservice 🛒

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Orders Microservice manages the order processing system in our e-commerce platform. It handles order creation, tracking, and status management while coordinating with other microservices.

## ✨ Features

- **Order Management**

  - Order creation and processing
  - Order status tracking

- **Integration**
  - Product service integration
  - User service integration
  - Notification service integration

## 🏗️ Architecture

```
Client → API Gateway → Orders Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Order Processing Flow

1. Client creates order
2. Service validates order
3. Status updates

## 📚 API Endpoints

### Order Management

```http
GET    /orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id
DELETE /orders/:id
```

## ⚙️ Configuration

### Environment Variables

```env
# Server Configuration
PORT=3004
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=orders_db

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=orders-service
```

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL
- Kafka

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
docker build -t orders-microservice .

# Run container
docker run -p 3004:3004 orders-microservice
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

- **Message Queue**

  - @nestjs/microservices
  - kafkajs

## 📝 License

This project is licensed under the MIT License.
