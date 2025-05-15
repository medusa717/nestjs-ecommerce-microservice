import { Type } from 'class-transformer';
import { OrderItemDto } from './orderitem-dto';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
