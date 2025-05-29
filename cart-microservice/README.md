# Cart Microservice

## Overview

The Cart Microservice manages shopping cart functionality, allowing users to add, update, and remove items from their cart. It integrates with the Products service to validate product availability.

## Features

- Shopping cart management
- Cart item operations
- Price calculations
- Integration with Products service
- Cart persistence

## API Endpoints

### Cart

- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:itemId` - Update cart item
- `DELETE /cart` - Clear cart

## Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=cart_db
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
- @nestjs/microservices
