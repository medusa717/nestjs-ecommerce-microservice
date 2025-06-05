import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface ProductImage {
    url: string;
    index: number;
}

export class CreateProductDto {
    @ApiProperty({ description: 'The name of the product', example: 'iPhone 13' })
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    sellerId: number;

    @ApiProperty({ description: 'The description of the product', example: 'Latest iPhone model' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'The price of the product', example: 999.99 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'The stock quantity of the product', example: 100 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'The category of the product', example: 'Electronics' })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsNumber()
    @IsOptional()
    rating: number;

    @IsNumber()
    @IsOptional()
    sell_count: number;

    @ApiProperty({ description: 'The images of the product', example: ['image1.jpg', 'image2.jpg'] })
    @IsArray()
    @IsOptional()
    images: ProductImage[];
}
