# Products Microservice

## Overview

The Products Microservice is responsible for managing product information, inventory, and stock updates in the e-commerce system. It handles product CRUD operations and integrates with Kafka for stock management.

## Features

- Product management (CRUD operations)
- Stock management
- Kafka integration for order events
- Stock warning notifications

## API Endpoints

### Products

- `GET /products` - Get all products (paginated)
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Stock Management

- Automatic stock updates via Kafka events
- Stock warning notifications for low inventory

## Kafka Events

### Consumed Events

- `order_created` - Updates stock when new order is created

### Produced Events

- `stock_warning` - Emitted when stock is insufficient

## Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=products_db
KAFKA_BROKERS=localhost:9092
```

## Running the Service

```bash
# Install dependencies
npm install

# Start the service
npm run start:dev
```

## Dependencies

- NestJS
- TypeORM
- PostgreSQL
- Kafka
- @nestjs/microservices
