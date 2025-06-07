# Shipping Microservice 🚚

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Shipping Microservice manages the shipping process in our e-commerce platform. It handles tracking, and delivery status updates while coordinating with other services.

## ✨ Features

- **Shipping Management**
  - Delivery tracking

- **Integration**
  - Orders service integration
  - Real-time updates

- **Tracking**
  - Delivery status updates

## 🏗️ Architecture

```
Client → API Gateway → Shipping Service → Database
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Shipping Flow
1. Order received
2. Tracking generated

## ⚙️ Configuration

### Environment Variables
```env
# Server Configuration
PORT=3007
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=shipping_db

# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=shipping-service
KAFKA_GROUP_ID=shipping-group
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
docker build -t shipping-microservice .

# Run container
docker run -p 3007:3007 shipping-microservice
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