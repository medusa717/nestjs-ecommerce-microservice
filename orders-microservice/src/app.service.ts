import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { OrderItem } from './entities/orderItems.entity';
import { ClientKafka, ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateOrderDto,
  UpdateOrderDto,
  OrderItemDto,
  SERVICES,
  ORDER_KAFKA_EVENTS,
  OrderCreatedEvent,
  ProductPatterns,
} from '@my/common';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // User repository

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @Inject(SERVICES.KAFKA.name) private readonly kafkaClient: ClientKafka,

    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderItems'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!order)
      throw new RpcException({
        code: 404,
        message: `Order with id ${id} not found`,
      });

    return order; // Return the found order
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productIds = createOrderDto.orderItems.map((item) => item.productId);
    const products = await lastValueFrom(
      this.productsMicroservice.send(
        { cmd: ProductPatterns.FindMany },
        { ids: productIds },
      ),
    );

    if (products.length !== createOrderDto.orderItems.length) {
      throw new RpcException({
        code: 404,
        message: 'One or more products not found',
      });
    }

    const orderItems = createOrderDto.orderItems.map((item) => {
      return this.orderItemRepository.create({
        productId: item.productId,
        price: item.unitPrice,
        totalPrice: item.totalPrice,
        quantity: item.quantity,
      });
    });

    const newOrder = this.orderRepository.create({
      totalPrice: createOrderDto.totalPrice,
      userId: createOrderDto.userId,
      orderItems,
    });

    const savedOrder = await this.orderRepository.save(newOrder);
    const orderCreatedEvent: OrderCreatedEvent = {
      orderId: savedOrder.id,
      userId: savedOrder.userId,
      totalPrice: savedOrder.totalPrice,
      items: savedOrder.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    this.kafkaClient.emit(ORDER_KAFKA_EVENTS.ORDER_CREATED, {
      value: orderCreatedEvent,
    });

    return savedOrder;
  }

  async update(id: number, order: UpdateOrderDto) {
    const existingOrder = await this.orderRepository.findOne({ where: { id } });
    if (!existingOrder)
      throw new RpcException({
        code: 404,
        message: `Order with id ${id} not found`,
      });

    if (order.orderItems) {
      const updatedOrderItems = order.orderItems.map((item) => {
        return {
          ...item,
          product: { id: item.productId },
          price: item.unitPrice,
        };
      });

      order.totalPrice = order.orderItems.reduce(
        (total: number, item: OrderItemDto) =>
          total + item.quantity * item.unitPrice,
        0,
      );
      order.orderItems = updatedOrderItems;
    }

    const updatedOrder: Order = {
      ...existingOrder,
      ...Object.fromEntries(
        Object.entries(order).filter(([_, value]) => value !== undefined),
      ),
    };

    const updateOrder = await this.orderRepository.save(updatedOrder); // Save the updated order to the database
    return updateOrder;
  }

  async remove(id: number): Promise<Order | null> {
    const existingOrder = await this.orderRepository.findOne({ where: { id } });
    if (!existingOrder)
      throw new RpcException({
        code: 404,
        message: `Order with id ${id} not found`,
      });

    await this.orderRepository.delete(id); // Delete the order from the database
    return existingOrder; // Return the deleted order
  }
}
