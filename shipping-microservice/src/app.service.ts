import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shipping, ShippingDocument } from './schema/shipping.schema';
import { OrderCreatedEvent, SHIPPING_KAFKA_EVENTS } from '@my/common';
import { ShippingKafkaProducerService } from './shipping-kafka-producer.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Shipping.name) private shippingModel: Model<ShippingDocument>,
    private readonly shippingKafkaProducerService: ShippingKafkaProducerService,
  ) {}

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    const shipping = await this.shippingModel.findOne({
      userId: orderCreatedEvent.userId,
      orderId: orderCreatedEvent.orderId,
    });
    if (shipping) return shipping;

    const newShipping = new this.shippingModel({
      userId: orderCreatedEvent.userId,
      orderId: orderCreatedEvent.orderId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.shippingModel.create({
      userId: orderCreatedEvent.userId,
      orderId: orderCreatedEvent.orderId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.shippingKafkaProducerService.emit(
      SHIPPING_KAFKA_EVENTS.SHIPPING_CREATED,
      {
        value: newShipping,
      },
    );
    return await newShipping.save();
  }

  async findOne(id: number) {
    return await this.shippingModel.findOne({ orderId: id });
  }
}
