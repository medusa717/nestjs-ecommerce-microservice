import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductPatterns, CreateProductDto } from '@my/common';
import { PaginatedResponse } from 'src/common/types/PaginatedResponse';

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

  async getProducts({
    page,
    limit,
    sort,
    order,
  }): Promise<PaginatedResponse<[]>> {
    return firstValueFrom(
      this.productsMicroservice.send(
        { cmd: ProductPatterns.FindAll },
        { page, limit, sort, order },
      ),
    );
  }

  async getProduct(id: number) {
    return firstValueFrom(
      this.productsMicroservice.send({ cmd: ProductPatterns.FindOne }, { id }),
    );
  }

  async createProduct(productDto: CreateProductDto) {
    return this.productsMicroservice.send(
      { cmd: ProductPatterns.Create },
      productDto,
    );
  }

  async updateProduct(id: number, product: CreateProductDto) {
    return firstValueFrom(
      this.productsMicroservice.send(
        { cmd: ProductPatterns.Update },
        { id, product },
      ),
    );
  }

  async deleteProduct(id: number) {
    return firstValueFrom(
      this.productsMicroservice.send({ cmd: ProductPatterns.Delete }, { id }),
    );
  }
}
