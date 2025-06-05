import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from '@my/common';
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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user cart',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getCart(@Req() req: any) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({
    status: 201,
    description: 'Item successfully added to cart',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid cart data',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() dto: AddToCartDto) {
    dto.userId = req.user.id;
    return this.cartService.addToCart(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Update cart items' })
  @ApiResponse({
    status: 200,
    description: 'Cart successfully updated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid cart data',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Req() req: any, @Body() dto: UpdateCartDto) {
    dto.userId = req.user.id;
    return this.cartService.updateCart(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart successfully deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: any) {
    const userId = req.user.id;
    return this.cartService.deleteCart(userId);
  }
}
