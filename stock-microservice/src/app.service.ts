import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import {
  OrderCreatedEvent,
  ProductPatterns,
  SERVICES,
  STOCK_KAFKA_EVENTS,
} from '@my/common';

@Injectable()
export class AppService {
  constructor(
    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,

    @Inject(SERVICES.KAFKA.name) private readonly kafkaClient: ClientKafka,
  ) {}

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    for (const item of orderCreatedEvent.items) {
      const product = await lastValueFrom(
        this.productsMicroservice.send(
          { cmd: ProductPatterns.DecreaseStock },
          { id: item.productId, quantity: item.quantity },
        ),
      );

      if (product.stock > 0) continue;

      this.kafkaClient.emit(STOCK_KAFKA_EVENTS.STOCK_WARNING, {
        productId: item.productId,
        quantity: item.quantity,
      });
    }
  }
}
