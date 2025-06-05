import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        description: 'The new status of the order',
        enum: OrderStatus,
        example: OrderStatus.SHIPPED,
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
