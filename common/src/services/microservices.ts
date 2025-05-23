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
        name: 'PRODUCT_MICROSERVICE',
        host: 'product-microservice',
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
};

export const SERVICES_CONFIG = (service: keyof typeof SERVICES) => ({
    name: SERVICES[service].name,
    transport: Transport.TCP,
    options: {
        host: SERVICES[service].host,
        port: SERVICES[service].port,
    },
});
