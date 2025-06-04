import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { CreateProductDto, ProductPatterns } from '@my/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly productsService: AppService) {}

  @MessagePattern({ cmd: ProductPatterns.FindAll })
  findAll(@Payload() { page, limit, sort, order }) {
    return this.productsService.findAll({ page, limit, sort, order });
  }

  @MessagePattern({ cmd: ProductPatterns.FindMany })
  findMany(@Payload() { ids }) {
    return this.productsService.findMany(ids);
  }

  @MessagePattern({ cmd: ProductPatterns.FindOne })
  findOne(@Payload() { id }) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: ProductPatterns.Create })
  create(@Payload() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @MessagePattern({ cmd: ProductPatterns.Update })
  update(@Payload() { id, product }) {
    return this.productsService.update(id, product);
  }

  @MessagePattern({ cmd: ProductPatterns.Delete })
  delete(@Payload() { id }) {
    return this.productsService.delete(id);
  }

  @MessagePattern({ cmd: ProductPatterns.DecreaseStock })
  decreaseStock(@Payload() { id, quantity }) {
    return this.productsService.decreaseStock(id, quantity);
  }
}
