import { IsNumber, Min } from 'class-validator';

export interface OrderItemWithUnitPrice {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsNumber()
  @Min(0)
  totalPrice: number;
}
