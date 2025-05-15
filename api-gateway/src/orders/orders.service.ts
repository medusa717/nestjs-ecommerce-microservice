import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserType } from 'src/common/types/UserTypes';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPatterns } from 'src/common/patterns/orders.patterns';

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
