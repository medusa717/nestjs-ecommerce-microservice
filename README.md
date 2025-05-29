# Nest E-commerce Microservice Architecture

## Overview

This project is a modern e-commerce platform built using a microservice architecture with NestJS. The system is designed to be scalable, maintainable, and follows best practices in distributed systems.

## Architecture

The system consists of the following microservices:

-   **API Gateway**: Entry point for all client requests, handles routing and request aggregation
    -   [Detailed Documentation](./api-gateway/README.md)
-   **Auth Microservice**: Manages user authentication and authorization
    -   [Detailed Documentation](./auth-microservice/README.md)
-   **Users Microservice**: Handles user management and profiles
    -   [Detailed Documentation](./users-microservice/README.md)
-   **Products Microservice**: Manages product catalog and inventory
    -   [Detailed Documentation](./products-microservice/README.md)
-   **Cart Microservice**: Handles shopping cart operations
    -   [Detailed Documentation](./cart-microservice/README.md)
-   **Orders Microservice**: Processes and manages orders
    -   [Detailed Documentation](./orders-microservice/README.md)
-   **Stock Microservice**: Manages product stock levels
    -   [Detailed Documentation](./stock-microservice/README.md)
-   **Shipping Microservice**: Handles shipping and delivery operations
    -   [Detailed Documentation](./shipping-microservice/README.md)
-   **Notifications Microservice**: Manages system notifications and alerts
    -   [Detailed Documentation](./notifications-microservice/README.md)

## Technology Stack

-   **Framework**: NestJS
-   **Language**: TypeScript
-   **Databases**:
    -   PostgreSQL (Primary database for most microservices)
    -   MongoDB (Used for specific microservices requiring document storage)
-   **Message Broker**: Apache Kafka
-   **Containerization**: Docker
-   **Orchestration**: Docker Compose

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   Docker and Docker Compose
-   Git

### Installation

1. Clone the repository:

```bash
git clone https://gitlab.com/onurcansevinc/nest-ecommerce-microservice.git
cd nest-ecommerce-microservice
```

2. Install dependencies for each microservice:

```bash
# Navigate to each microservice directory and run:
npm install
```

3. Start the services using Docker Compose:

```bash
docker-compose up -d
```

## Development

### Running Services Locally

Each microservice can be run independently for development:

```bash
# Example for running the auth service
cd auth-microservice
npm run start:dev
```

### Environment Configuration

Each microservice has its own `.env` file. Make sure to set up the required environment variables before running the services.

### Database Configuration

The project uses multiple databases:

-   PostgreSQL runs on port 5432
-   MongoDB runs on port 27017

Make sure to set the following environment variables for PostgreSQL:

-   POSTGRES_USER
-   POSTGRES_PASSWORD
-   POSTGRES_DB

## Features

-   Microservice-based architecture for better scalability
-   Event-driven communication using Kafka
-   Containerized deployment with Docker
-   TypeScript for type safety and better developer experience
-   RESTful API design
-   Centralized API Gateway for request routing
-   Distributed authentication and authorization
-   Real-time notifications
-   Order processing and management
-   Inventory and stock management
-   Shopping cart functionality
-   User management system

## Project Structure

```
├── api-gateway/           # API Gateway service
├── auth-microservice/     # Authentication service
├── users-microservice/    # User management service
├── products-microservice/ # Product catalog service
├── cart-microservice/     # Shopping cart service
├── orders-microservice/   # Order processing service
├── stock-microservice/    # Inventory management service
├── shipping-microservice/ # Shipping service
├── notifications-microservice/ # Notification service
├── common/               # Shared utilities and types
└── docker-compose.yml    # Docker compose configuration
```

## API Documentation

Each microservice exposes its own API endpoints. The API Gateway provides a unified interface for all client requests. Detailed API documentation can be found in each microservice's documentation.

## Support

For any questions or issues, please create an issue in the GitLab repository.
