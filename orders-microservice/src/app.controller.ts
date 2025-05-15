import { AppService } from './app.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Payload, RpcException } from '@nestjs/microservices';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPatterns } from './common/patterns/orders.patterns';
import { UserRole } from './common/types/UserTypes';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: OrderPatterns.FindAll })
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: OrderPatterns.FindOne })
  async findOne(
    @Payload() payload: { id: number; user: { id: number; role: UserRole } },
  ) {
    const order = await this.appService.findOne(payload.id);
    if (!order)
      throw new RpcException({
        code: 404,
        message: `Order with id ${payload.id} not found`,
      });

    if (
      payload.user.role === UserRole.USER &&
      order.userId !== payload.user.id
    ) {
      throw new RpcException({
        code: 403,
        message: `Order with id ${payload.id} not found for this user`,
      });
    }

    return order;
  }

  @MessagePattern({ cmd: OrderPatterns.Create })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.appService.create(createOrderDto);
  }

  @MessagePattern({ cmd: OrderPatterns.Update })
  async update(@Payload() payload: { id: number; order: UpdateOrderDto }) {
    const existingOrder = await this.appService.findOne(payload.id);
    if (!existingOrder)
      throw new RpcException({
        code: 404,
        message: `Order with id ${payload.id} not found`,
      });

    return this.appService.update(payload.id, payload.order);
  }

  @MessagePattern({ cmd: OrderPatterns.Delete })
  async delete(@Payload() payload: { id: number }) {
    const order = await this.appService.findOne(payload.id);
    if (!order)
      throw new RpcException({
        code: 404,
        message: `Order with id ${payload.id} not found`,
      });

    return this.appService.remove(payload.id);
  }
}
