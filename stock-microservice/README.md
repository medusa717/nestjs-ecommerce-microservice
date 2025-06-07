# Stock Microservice 📦

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Stock Microservice manages product inventory and stock levels in our e-commerce platform. It handles stock updates, monitors inventory levels, and coordinates with other services to maintain accurate stock information.

## ✨ Features

- **Stock Management**
  - Real-time stock tracking
  - Stock level monitoring
  - Stock warnings

- **Event Processing**
  - Kafka event consumption
  - Order event processing
  - Stock update events

- **Integration**
  - Products service integration
  - Orders service integration
  - Real-time updates

## 🏗️ Architecture

```
Client → API Gateway → Stock Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Stock Flow
1. Order event received
2. Stock level checked
3. Stock updated

## ⚙️ Configuration

### Environment Variables
```env
# Server Configuration
PORT=3006
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=stock_db

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=stock-service
KAFKA_GROUP_ID=stock-group
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
docker build -t stock-microservice .

# Run container
docker run -p 3006:3006 stock-microservice
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

- **Validation**
  - class-validator
  - class-transformer

## 📝 License

This project is licensed under the MIT License.