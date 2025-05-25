export class ShippingCreatedEvent {
    userId: number;
    orderId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;

    toString() {
        return JSON.stringify(this);
    }
}
