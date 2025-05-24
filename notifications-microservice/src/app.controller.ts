import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ORDER_KAFKA_EVENTS, OrderCreatedEvent } from '@my/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  handleOrderCreatedEvent(orderCreatedEvent: OrderCreatedEvent) {
    return this.appService.orderCreatedEventHandler(orderCreatedEvent);
  }
}
