# Common Library 📚

## Overview

The Common Library is a shared module that contains reusable components, DTOs, entities, and utilities used across all microservices in the e-commerce platform. This library ensures consistency and reduces code duplication across the microservices architecture.

## 📋 Table of Contents

-   [Features](#features)
-   [Structure](#structure)
-   [Installation](#installation)
-   [Usage](#usage)

## ✨ Features

-   **Shared DTOs**: Common Data Transfer Objects used across microservices
-   **Enums**: Shared enumerations for consistent data representation
-   **Events**: Kafka event definitions and interfaces
-   **Interceptors**: Common interceptors for request/response handling
-   **Pipes**: Shared validation and transformation pipes
-   **Services**: Reusable service implementations
-   **Types**: Common TypeScript type definitions
-   **Patterns**: Design patterns and utilities

## 🏗️ Structure

```
src/
├── dto/           # Data Transfer Objects
├── enums/         # Enumerations
├── events/        # Kafka event definitions
├── interceptors/  # Request/Response interceptors
├── pipes/         # Validation and transformation pipes
├── services/      # Shared services
├── types/         # TypeScript type definitions
└── patterns/      # Design patterns and utilities
```

## 🚀 Installation

1. Install the package in your microservice:

```bash
npm install @my/common
```

2. Import the module in your microservice:

```typescript
import { CommonModule } from '@my/common';

@Module({
    imports: [CommonModule],
    // ...
})
export class YourModule {}
```

## 💻 Usage

### DTOs

```typescript
import { CreateUserDto, UserResponseDto } from '@my/common';

@Controller('users')
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        // ...
    }
}
```

### Events

```typescript
import { OrderCreatedEvent } from '@my/common';

@Injectable()
export class OrderService {
    @EventPattern('order_created')
    handleOrderCreated(data: OrderCreatedEvent) {
        // ...
    }
}
```

### Interceptors

```typescript
import { LoggingInterceptor } from '@my/common';

@UseInterceptors(LoggingInterceptor)
@Controller('products')
export class ProductsController {
    // ...
}
```

### Pipes

```typescript
import { ValidationPipe } from '@my/common';

@Post()
@UsePipes(ValidationPipe)
create(@Body() createDto: CreateDto) {
  // ...
}
```

## 🔧 Development

### Building the Library

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

### Watching for Changes

```bash
npm run build:watch
```

## 📝 License

This library is part of the e-commerce microservice project and is licensed under the MIT License.
