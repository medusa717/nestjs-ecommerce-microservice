import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

interface ProductImage {
  url: string;
  index: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsNumber()
  @IsOptional()
  sell_count: number;

  @IsArray()
  @IsOptional()
  images: ProductImage[];
}
