# Shipping Microservice

## Overview
The Shipping Microservice manages the shipping process for orders, handling shipping status updates and notifications. It integrates with Kafka to process order events and maintains shipping records in MongoDB.

## Features
- Shipping status management
- Shipping record tracking
- Kafka event processing
- Shipping notifications
- MongoDB integration

## API Endpoints (To Be Implemented)

### Shipping Management
- `GET /shipping/:orderId` - Get shipping details for an order
- `PUT /shipping/:orderId/status` - Update shipping status
- `GET /shipping/user/:userId` - Get user's shipping history

## Kafka Events
### Consumed Events
- `order_created` - Create shipping record for new orders

### Produced Events
- `shipping_created` - Emitted when shipping record is created
- `shipping_status_changed` - Emitted when shipping status changes

## Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/shipping
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
- MongoDB
- Mongoose
- Kafka
- @nestjs/microservices

## Implementation Status
- ✅ Basic service setup
- ✅ MongoDB integration
- ✅ Kafka consumer for order_created event
- ✅ Shipping record creation
- ❌ REST API endpoints
- ❌ Shipping status management
- ❌ Shipping notifications
- ❌ Shipping tracking system