import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginatedResponse } from './common/types/PaginatedResponse';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // User repository
  ) {}

  async findAll({
    page,
    limit,
    sort,
    order,
  }): Promise<PaginatedResponse<Product[]>> {
    const offset = page * limit;
    const total = await this.productRepository.count(); // Get the total number of products

    const data = await this.productRepository
      .createQueryBuilder('user')
      .orderBy(`user.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Product | undefined> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, product: CreateProductDto) {
    const existingProdcut = await this.productRepository.findOne({
      where: { id },
    });
    if (!existingProdcut)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });

    const updatedProduct: Product = {
      ...existingProdcut,
      ...Object.fromEntries(
        Object.entries(product).filter(([_, value]) => value !== undefined),
      ),
    };

    return await this.productRepository.save(updatedProduct); // Save the updated user to the database
  }

  async delete(id: number) {
    const existingProdcut = this.productRepository.findOne({ where: { id } });
    if (!existingProdcut)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });

    this.productRepository.delete(id); // Delete the user from the database
    return existingProdcut; // Return the deleted user
  }
}
