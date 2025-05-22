import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserType, CreateOrderDto, UpdateOrderDto, OrderPatterns } from '@my/common';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_MICROSERVICE')
    private readonly ordersMicroservice: ClientProxy,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersMicroservice.send(
      { cmd: OrderPatterns.Create },
      createOrderDto,
    );
  }

  findAll() {
    return this.ordersMicroservice.send({ cmd: OrderPatterns.FindAll }, {});
  }

  findOne(id: number, user: UserType) {
    return this.ordersMicroservice.send(
      { cmd: OrderPatterns.FindOne },
      { id, user },
    );
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.ordersMicroservice.send(
      { cmd: OrderPatterns.Update },
      { id, updateOrderDto },
    );
  }

  remove(id: number) {
    return this.ordersMicroservice.send({ cmd: OrderPatterns.Delete }, { id });
  }
}
