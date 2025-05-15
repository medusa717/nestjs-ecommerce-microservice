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

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  sellerId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsOptional()
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
