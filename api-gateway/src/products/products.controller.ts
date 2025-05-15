import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalizeName';
import { UserRole } from 'src/common/types/UserTypes';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jtw-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 0,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('sort') sort: string = 'id',
    @Query('order') order: string = 'asc',
  ): Promise<PaginatedResponse<[]>> {
    return this.productsService.getProducts({ page, limit, sort, order });
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.getProduct(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  createProduct(
    @Body('name', CapitalizeNamePipe) name: string,
    @Body() newProduct: CreateProductDto,
  ) {
    newProduct.name = name;
    return this.productsService.createProduct(newProduct);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body('name', CapitalizeNamePipe) name: string,
    @Body() product: UpdateProductDto,
  ) {
    const existingProduct = this.productsService.getProduct(id);
    if (!existingProduct)
      throw new NotFoundException(`Product with id ${id} not found`);

    product.name = name;
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.productsService.getProduct(id);
    if (!user) throw new NotFoundException(`Product with id ${id} not found`);

    return this.productsService.deleteProduct(id);
  }
}
