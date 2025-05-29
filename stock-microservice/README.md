# Stock Microservice

## Overview
The Stock Microservice is responsible for managing product stock levels and handling stock-related events. It integrates with Kafka to process order events and communicates with the Products service for stock updates.

## Features
- Stock level monitoring
- Stock warning notifications
- Kafka event processing
- Integration with Products service
- Real-time stock updates

## API Endpoints (To Be Implemented)

### Stock Management
- `GET /stock/:productId` - Get product stock level
- `POST /stock/update` - Update product stock
- `GET /stock/warnings` - Get stock warnings

## Kafka Events
### Consumed Events
- `order_created` - Process stock updates for new orders

### Produced Events
- `stock_warning` - Emitted when stock level is low

## Environment Variables
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=stock_db
KAFKA_BROKERS=localhost:9092
PRODUCTS_SERVICE_HOST=localhost
PRODUCTS_SERVICE_PORT=3003
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

## Implementation Status
- ✅ Basic service setup
- ✅ Kafka consumer for order_created event
- ✅ Stock warning event producer
- ❌ REST API endpoints
- ❌ Stock level monitoring dashboard
- ❌ Real-time stock updates