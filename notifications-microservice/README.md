# Notifications Microservice

## Overview
The Notifications Microservice handles all system notifications, including order status updates, stock warnings, and user notifications. It integrates with Kafka to receive events from other services.

## Features
- Email notifications
- SMS notifications
- Push notifications
- Notification templates
- Kafka event processing

## API Endpoints

### Notifications
- `GET /notifications` - Get user notifications
- `POST /notifications` - Send notification
- `PUT /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

## Kafka Events
### Consumed Events
- `order_created` - Send order confirmation
- `order_status_changed` - Send status update
- `stock_warning` - Send low stock alert

## Environment Variables
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=notifications_db
KAFKA_BROKERS=localhost:9092
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
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
- nodemailer