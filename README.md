# NestJS E-Commerce Microservices

A scalable e-commerce platform built with NestJS using a microservice architecture, event-driven communication, and polyglot persistence.

## Features

- Microservice-based architecture
- Centralized API Gateway
- JWT authentication
- Role-based authorization
- Product management
- Shopping cart management
- Order processing
- Inventory management
- Shipping management
- Email notifications
- Redis caching
- Apache Kafka event streaming
- TCP microservice communication
- PostgreSQL and MongoDB
- Docker Compose
- Swagger/OpenAPI documentation

## Tech Stack

- NestJS
- TypeScript
- Node.js
- PostgreSQL
- MongoDB
- Redis
- Apache Kafka
- Docker
- Docker Compose
- JWT
- Swagger

## Architecture

    API Gateway
          |
    +-----+------+------+------+------+
    |            |             |      |
    v            v             v      v
    Auth       Users        Products  Cart
    Service    Service      Service  Service
                              |
                              v
                           Orders
                           Service
                              |
                            Kafka
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
            Stock         Shipping      Notifications
            Service        Service         Service
                                             |
                                             v
                                           Email

## Microservices

### API Gateway

Central entry point for client requests, authentication, authorization, and communication with internal services.

### Auth Service

Handles user authentication and JWT-based authorization.

### Users Service

Manages users, roles, and user-related data.

### Products Service

Provides product CRUD operations, searching, pagination, sorting, caching, and inventory communication.

### Cart Service

Manages user shopping carts and cart persistence.

### Orders Service

Handles order creation and lifecycle management while publishing order events to Kafka.

### Stock Service

Manages inventory and reacts to order events to update product stock.

### Shipping Service

Processes shipping workflows triggered by order events.

### Notifications Service

Consumes events and sends customer notifications and emails.

## Communication

The system uses multiple communication patterns:

- REST for external API requests
- TCP for synchronous internal service communication
- Apache Kafka for asynchronous event-driven workflows

Order workflow:

    Order Created
         |
         v
    Kafka Event
         |
    +----+----+----------------+
    |         |                |
    v         v                v
   Stock   Shipping      Notifications
  Service   Service         Service
                              |
                              v
                            Email

## Data Layer

Different services use storage technologies based on their requirements:

- PostgreSQL for relational business data
- MongoDB for flexible document-oriented data
- Redis for caching and performance optimization

## Security

- JWT authentication
- Authentication guards
- Role-based access control
- Protected API routes
- Service-level authorization

## Project Structure

    api-gateway/
    auth-microservice/
    users-microservice/
    products-microservice/
    cart-microservice/
    orders-microservice/
    stock-microservice/
    shipping-microservice/
    notifications-microservice/
    common/
    database/
    docker-compose.yml
    .env.template

## Getting Started

### Requirements

- Node.js
- Docker
- Docker Compose

### Installation

    git clone https://github.com/onurcansevinc/nestjs-ecommerce-microservice.git
    cd nestjs-ecommerce-microservice
    cp .env.template .env

### Run with Docker

    docker-compose up -d

## API Documentation

Swagger/OpenAPI documentation is available through the API Gateway.

    http://localhost:3000/api

## Engineering Highlights

- Distributed microservice architecture
- Event-driven system design
- Kafka-based asynchronous processing
- API Gateway pattern
- Polyglot persistence
- Redis caching
- JWT authentication and RBAC
- Dockerized infrastructure
- REST and TCP communication
- Independent service boundaries
- Scalable backend architecture

## License

MIT