import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class ProductImage {
    @ApiProperty({
        description: 'Image URL',
        example: 'https://example.com/image.jpg',
    })
    url: string;

    @ApiProperty({
        description: 'Image index',
        example: 0,
    })
    index: number;
}

export class UpdateProductDto {
    @ApiProperty({
        description: 'Product name',
        example: 'iPhone 13',
        required: false,
    })
    @IsOptional()
    name: string;

    @ApiProperty({
        description: 'Seller ID',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    sellerId: number;

    @ApiProperty({
        description: 'Product description',
        example: 'Latest iPhone model with amazing features',
        required: false,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Product price',
        example: 999.99,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiProperty({
        description: 'Product stock',
        example: 100,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    stock: number;

    @ApiProperty({
        description: 'Category ID',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    category_id: number;

    @ApiProperty({
        description: 'Product rating',
        example: 4.5,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    rating: number;

    @ApiProperty({
        description: 'Product sell count',
        example: 50,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    sell_count: number;

    @ApiProperty({
        description: 'Product images',
        type: [ProductImage],
        required: false,
    })
    @IsArray()
    @IsOptional()
    images: ProductImage[];
}
