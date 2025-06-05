import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
    @ApiProperty({
        description: 'User ID',
        example: 1,
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Product ID',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({
        description: 'Product quantity',
        example: 2,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
