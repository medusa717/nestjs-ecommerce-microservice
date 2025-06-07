# Notifications Microservice 📨

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Development](#development)

## 🎯 Overview

The Notifications Microservice handles all communication channels in our e-commerce platform. It manages email notifications for various events in the system.

## ✨ Features

- **Notification Channels**
  - Email notifications

- **Templates**
  - Customizable email templates

- **Delivery Management**
  - Delivery status tracking
  - Rate limiting
  - Queue management

## 🏗️ Architecture

```
Client → API Gateway → Notifications Service → External Services
  ↑          ↓            ↓
  └──────────┴────────────┘
```

### Notification Flow
1. Event received from other services
2. Template selection and rendering
4. Delivery execution
5. Status tracking

## ⚙️ Configuration

### Environment Variables
```env
# Server Configuration
PORT=3005
NODE_ENV=development

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## 💻 Development

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- Redis
- SMTP Server (for email testing)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

### Docker
```bash
# Build Docker image
docker build -t notifications-microservice .

# Run container
docker run -p 3005:3005 notifications-microservice
```
## 📦 Dependencies

- **Core**
  - @nestjs/core
  - @nestjs/common
  - @nestjs/microservices
  - @nestjs/config

- **Email**
  - nodemailer

## 📝 License

This project is licensed under the MIT License.