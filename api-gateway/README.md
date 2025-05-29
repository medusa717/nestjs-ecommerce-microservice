# API Gateway

## Overview

The API Gateway serves as the entry point for all client requests, routing them to appropriate microservices. It handles request/response transformation, authentication, and load balancing.

## Features

- Request routing
- Authentication middleware
- Request/response transformation
- Load balancing
- Rate limiting
- API documentation (Swagger)

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Cancel order

### Cart

- `GET /cart` - Get user's cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:itemId` - Update cart item
- `DELETE /cart/items/:itemId` - Remove item from cart

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/me` - Get current user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Environment Variables

```env
PORT=3000
AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=3001
USERS_SERVICE_HOST=localhost
USERS_SERVICE_PORT=3002
PRODUCTS_SERVICE_HOST=localhost
PRODUCTS_SERVICE_PORT=3003
ORDERS_SERVICE_HOST=localhost
ORDERS_SERVICE_PORT=3004
CART_SERVICE_HOST=localhost
CART_SERVICE_PORT=3005
NOTIFICATIONS_SERVICE_HOST=localhost
NOTIFICATIONS_SERVICE_PORT=3006
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
- @nestjs/microservices
- @nestjs/swagger
- class-validator
- class-transformer
