import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'The total price of the items', example: 1 })
    totalPrice: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'The user id', example: 1 })
    userId: number;

    @IsArray()
    @Type(() => OrderItemDto)
    @ApiProperty({ description: 'The items in the order', type: [Object] })
    orderItems: OrderItemDto[];
}
