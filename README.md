# Nest E-commerce Microservice Architecture 🚀

## 📋 Table of Contents

-   [Overview](#overview)
-   [Technologies](#technologies)
-   [Microservices](#microservices)
-   [Features](#features)
-   [Installation](#installation)
-   [API Documentation](#api-documentation)

## 🎯 Overview

This project is an e-commerce platform developed using modern microservice architecture and Event Driven Architecture. Each microservice operates independently and is orchestrated using Docker Compose.

## 🛠️ Technologies

-   **Framework**: NestJS
-   **Databases**:
    -   PostgreSQL (Users, Products, Orders)
    -   MongoDB (Cart)
-   **Message Broker**: Apache Kafka
-   **Cache**: Redis
-   **Authentication**: JWT
-   **API Documentation**: Swagger/OpenAPI
-   **Containerization**: Docker & Docker Compose
-   **Communication**: TCP (Microservices), REST (API Gateway)
-   **Core Components**:
    -   [Common Library README](./common/README.md)
    -   [API Gateway README](./api-gateway/README.md)

## 🏗️ Microservices

### 🔐 Auth Microservice

-   [Auth Microservice README](./auth-microservice/README.md)
-   JWT token generation and validation
-   Login, me, and verify endpoints
-   User authentication

### 👥 Users Microservice

-   [Users Microservice README](./users-microservice/README.md)
-   User CRUD operations
-   PostgreSQL database
-   Role-based authorization

### 📦 Products Microservice

-   [Products Microservice README](./products-microservice/README.md)
-   Product CRUD operations
-   PostgreSQL database
-   Product-image relationship (One-to-Many)
-   Search, sorting, and pagination
-   Redis caching
-   Stock updates via TCP

### 🛒 Cart Microservice

-   [Cart Microservice README](./cart-microservice/README.md)
-   Cart CRUD operations
-   MongoDB database
-   User-based cart management

### 📝 Orders Microservice

-   [Orders Microservice README](./orders-microservice/README.md)
-   Order CRUD operations
-   PostgreSQL database
-   Kafka event publishing (order_created)

### 📊 Stock Microservice

-   [Stock Microservice README](./stock-microservice/README.md)
-   Stock management
-   Kafka event listening (order_created)
-   TCP communication with Products microservice

### 🚚 Shipping Microservice

-   [Shipping Microservice README](./shipping-microservice/README.md)
-   Shipping process management
-   Kafka event listening (order_created)
-   Dummy data for shipping tracking

### 🔔 Notifications Microservice

-   [Notifications Microservice README](./notifications-microservice/README.md)
-   Order notifications
-   Kafka event listening (order_created)
-   Email notifications

## ✨ Features

-   **Microservice Architecture**

    -   Independent service development
    -   Docker Compose orchestration
    -   Service isolation

-   **Event Driven Architecture**

    -   Event publishing and listening with Kafka
    -   Asynchronous communication
    -   Service independence

-   **API Gateway**

    -   Central entry point
    -   Guard protection
    -   Request routing

-   **Database Management**

    -   PostgreSQL (Relational data)
    -   MongoDB (Document-based data)
    -   Redis (Caching)

-   **Security**

    -   JWT-based authentication
    -   Guard protection
    -   Role-based authorization

-   **Performance**
    -   Redis caching
    -   Database optimization
    -   Microservice isolation

## 🚀 Installation

### Prerequisites

-   Node.js (v16 or higher)
-   Docker and Docker Compose
-   Git

### Steps

1. Clone the repository:

```bash
git clone https://gitlab.com/onurcansevinc/nest-ecommerce-microservice.git
cd nest-ecommerce-microservice
```

2. Configure environment variables:

```bash
cp .env.example .env
# Edit the .env file
```

3. Start with Docker:

```bash
docker-compose up -d
```

## 📚 API Documentation

Access Swagger UI at:

```
http://localhost:3000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
