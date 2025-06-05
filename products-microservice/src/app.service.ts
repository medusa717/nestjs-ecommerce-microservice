import { Cache } from 'cache-manager';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaginatedResponse, CreateProductDto } from '@my/common';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // User repository

    @Inject(CACHE_MANAGER) private cacheManager: Cache, // CacheManager'ı enjekte edin
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

  async findMany(ids: number[]): Promise<Product[]> {
    return await this.productRepository.find({
      where: { id: In(ids) },
    });
  }

  async findOne(id: number): Promise<Product | undefined> {
    const cacheKey = `product_${id}`;
    const cachedProduct = await this.cacheManager.get(cacheKey);
    if (cachedProduct) return cachedProduct as Product;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });

    await this.cacheManager.set(cacheKey, product);
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    const cacheKey = `product_${newProduct.id}`;
    await this.cacheManager.set(cacheKey, newProduct);
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

    const cacheKey = `product_${id}`;
    await this.cacheManager.set(cacheKey, updatedProduct);
    return await this.productRepository.save(updatedProduct); // Save the updated user to the database
  }

  async delete(id: number) {
    const existingProdcut = this.productRepository.findOne({ where: { id } });
    if (!existingProdcut)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });

    const cacheKey = `product_${id}`;
    await this.cacheManager.del(cacheKey); // Delete the product from the cache
    this.productRepository.delete(id); // Delete the user from the database
    return existingProdcut; // Return the deleted user
  }

  async decreaseStock(id: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product)
      throw new RpcException({
        code: 404,
        message: `Product with id ${id} not found`,
      });

    product.stock -= quantity;
    return await this.productRepository.save(product);
  }
}
