import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
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
