import { ProductsService } from './products.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jtw-auth.guard';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalizeName';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse';
import { CreateProductDto, UpdateProductDto, UserRole } from '@my/common';
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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of products',
    type: PaginatedResponse,
  })
  @UseInterceptors(CacheInterceptor)
  getProducts(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 0,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('sort') sort: string = 'id',
    @Query('order') order: string = 'asc',
  ): Promise<PaginatedResponse<[]>> {
    return this.productsService.getProducts({ page, limit, sort, order });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the product with the specified ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UseInterceptors(CacheInterceptor)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.getProduct(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  createProduct(
    @Body('name', CapitalizeNamePipe) name: string,
    @Body() newProduct: CreateProductDto,
  ) {
    newProduct.name = name;
    return this.productsService.createProduct(newProduct);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
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
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SELLER)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.productsService.getProduct(id);
    if (!user) throw new NotFoundException(`Product with id ${id} not found`);

    return this.productsService.deleteProduct(id);
  }
}
