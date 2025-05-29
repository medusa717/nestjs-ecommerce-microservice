# Orders Microservice

## Overview

The Orders Microservice manages the order processing system, handling order creation, updates, and status management. It integrates with Kafka to notify other services about order events.

## Features

- Order management (CRUD operations)
- Order status tracking
- Kafka event publishing
- Integration with Products service for stock management

## API Endpoints

### Orders

- `GET /orders` - Get all orders (paginated)
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order status
- `DELETE /orders/:id` - Cancel order

## Kafka Events

### Produced Events

- `order_created` - Emitted when a new order is created
- `order_status_changed` - Emitted when order status changes

## Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=orders_db
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
