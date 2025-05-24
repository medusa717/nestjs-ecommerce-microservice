export class OrderCreatedEvent {
    orderId: number;
    userId: number;
    totalPrice: number;
    items: {
        productId: number;
        quantity: number;
        price: number;
    }[];

    toString() {
        return JSON.stringify(this);
    }
}
