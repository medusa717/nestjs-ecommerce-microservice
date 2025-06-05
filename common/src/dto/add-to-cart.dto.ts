import { IsNotEmpty, IsNumber, IsString, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
    @ApiProperty({ description: 'The product ID to add to cart', example: 1 })
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({ description: 'The product ID to add to cart', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({ description: 'The quantity of the product', example: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
