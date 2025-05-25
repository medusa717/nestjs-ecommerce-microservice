import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import {
  ORDER_KAFKA_EVENTS,
  OrderCreatedEvent,
  ShippingPatterns,
} from '@my/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(ORDER_KAFKA_EVENTS.ORDER_CREATED)
  handleOrderCreatedEvent(orderCreatedEvent: OrderCreatedEvent) {
    return this.appService.orderCreatedEventHandler(orderCreatedEvent);
  }

  @MessagePattern({ cmd: ShippingPatterns.FindOne }, Transport.TCP)
  findOne(@Payload() { id }) {
    return this.appService.findOne(id);
  }
}
