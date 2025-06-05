import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface OrderItemWithUnitPrice {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export class OrderItemDto {
    @ApiProperty({ description: 'The product ID', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'The quantity of the product', example: 2 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @ApiProperty({ description: 'The price of the product at the time of order', example: 99.99 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsNumber()
    @Min(0)
    totalPrice: number;
}
