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
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalizeName';

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
  createProduct(
    @Body('name', CapitalizeNamePipe) name: string,
    @Body() newProduct: CreateProductDto,
  ) {
    newProduct.name = name;
    return this.productsService.createProduct(newProduct);
  }

  @Put(':id')
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
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.productsService.getProduct(id);
    if (!user) throw new NotFoundException(`Product with id ${id} not found`);

    return this.productsService.deleteProduct(id);
  }
}
