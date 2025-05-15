import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartDto {
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
