import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AddToCartDto, UpdateCartDto, CartPatterns } from '@my/common';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_MICROSERVICE')
    private readonly cartMicroservice: ClientProxy,
  ) {}

  getCart(userId: number) {
    return this.cartMicroservice.send({ cmd: CartPatterns.GetCart }, userId);
  }

  addToCart(dto: AddToCartDto) {
    return this.cartMicroservice.send({ cmd: CartPatterns.Create }, dto);
  }

  updateCart(dto: UpdateCartDto) {
    return this.cartMicroservice.send({ cmd: CartPatterns.Update }, dto);
  }

  deleteCart(userId: number) {
    return this.cartMicroservice.send({ cmd: CartPatterns.Delete }, userId);
  }
}
