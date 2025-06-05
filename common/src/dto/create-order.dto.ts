import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ description: 'The items in the order', type: [Object] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty({ description: 'The shipping address ID', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    shippingAddressId: number;

    @ApiProperty({ description: 'The payment method ID', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    paymentMethodId: number;
}
