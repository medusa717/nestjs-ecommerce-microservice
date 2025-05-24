import { Transport } from '@nestjs/microservices';

export const SERVICES = {
    USERS: {
        name: 'USERS_MICROSERVICE',
        host: 'users-microservice',
        port: 3010,
    },
    AUTH: {
        name: 'AUTH_MICROSERVICE',
        host: 'auth-microservice',
        port: 3020,
    },
    PRODUCTS: {
        name: 'PRODUCTS_MICROSERVICE',
        host: 'products-microservice',
        port: 3030,
    },
    ORDERS: {
        name: 'ORDERS_MICROSERVICE',
        host: 'orders-microservice',
        port: 3040,
    },
    CART: {
        name: 'CART_MICROSERVICE',
        host: 'cart-microservice',
        port: 3050,
    },
    NOTIFICATIONS: {
        name: 'NOTIFICATIONS_MICROSERVICE',
        host: 'notifications-microservice',
        port: 3060,
    },
    SHIPPING: {
        name: 'SHIPPING_MICROSERVICE',
        host: 'shipping-microservice',
        port: 3070,
    },
    STOCK: {
        name: 'STOCK_MICROSERVICE',
        host: 'stock-microservice',
        port: 3080,
    },
    KAFKA: {
        name: 'KAFKA_MICROSERVICE',
        host: 'kafka',
        port: 9092,
    },
};

export const SERVICES_CONFIG = (service: keyof typeof SERVICES) => ({
    name: SERVICES[service].name,
    transport: Transport.TCP as const,
    options: {
        host: SERVICES[service].host,
        port: SERVICES[service].port,
    },
});
