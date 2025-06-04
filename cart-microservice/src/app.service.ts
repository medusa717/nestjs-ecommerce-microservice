import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ProductPatterns, SERVICES } from '@my/common';
import { Cart, CartDocument } from './schema/cart.schema';
import { AddToCartDto, UpdateCartDto } from './dto/cart.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @Inject(SERVICES.PRODUCTS.name)
    private readonly productsMicroservice: ClientProxy,
  ) {}

  async create(dto: AddToCartDto) {
    const product = await lastValueFrom(
      this.productsMicroservice.send(
        { cmd: ProductPatterns.FindOne },
        { id: dto.productId },
      ),
    );

    if (!product)
      throw new RpcException({
        code: 404,
        message: `Product not found with id: ${dto.productId}`,
      });

    const cart = await this.cartModel.findOne({ userId: dto.userId });
    if (!cart) {
      const newCart = new this.cartModel({
        userId: dto.userId,
        items: [
          {
            productId: dto.productId,
            name: product.name,
            price: product.price,
            quantity: dto.quantity,
          },
        ],
      });
      return await newCart.save();
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === dto.productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += dto.quantity;
    } else {
      cart.items.push({
        productId: dto.productId,
        name: product.name,
        price: product.price,
        quantity: dto.quantity,
      });
    }
    return cart.save();
  }

  async getCart(userId: number) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart)
      throw new RpcException({
        code: 404,
        message: `Cart not found for user ID: ${userId}`,
      });
    return cart;
  }

  async update(dto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId: dto.userId });
    if (!cart) {
      throw new RpcException({
        code: 404,
        message: `Cart not found for user ID: ${dto.userId}`,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === dto.productId,
    );

    if (itemIndex > -1) {
      if (dto.quantity === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = dto.quantity;
        cart.items[itemIndex].price =
          cart.items[itemIndex].price * dto.quantity;
      }
      return cart.save();
    } else {
      throw new RpcException({
        code: 404,
        message: `Product with ID ${dto.productId} not found in cart`,
      });
    }
  }

  async delete(userId: number): Promise<boolean> {
    return this.cartModel.deleteOne({ userId: userId }).then((result) => {
      if (result.deletedCount === 0) {
        throw new RpcException({
          code: 404,
          message: `Cart not found for user ID: ${userId}`,
        });
      }
      return true;
    });
  }
}
