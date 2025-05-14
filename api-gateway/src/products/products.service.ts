import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export const ProductPatterns = {
  Create: 'Products.create',
  FindAll: 'Products.findAll',
  FindOne: 'Products.findOne',
  Update: 'Products.update',
  Delete: 'Products.delete',
};

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MICROSERVICE')
    private readonly productsMicroservice: ClientProxy,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsMicroservice.send(
      { cmd: ProductPatterns.Create },
      createProductDto,
    );
  }

  findAll({ page, limit, sort, order }) {
    return this.productsMicroservice.send(
      { cmd: ProductPatterns.FindAll },
      { page, limit, sort, order },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
