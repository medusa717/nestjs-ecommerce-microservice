import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jtw-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCart(@Req() req: any) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() dto: AddToCartDto) {
    dto.userId = req.user.id;
    return this.cartService.addToCart(dto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Req() req: any, @Body() dto: UpdateCartDto) {
    dto.userId = req.user.id;
    return this.cartService.updateCart(dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: any) {
    const userId = req.user.id;
    return this.cartService.deleteCart(userId);
  }
}
