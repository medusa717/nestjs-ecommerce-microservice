import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

export const ProductPatterns = {
  Create: 'Products.create',
  FindAll: 'Products.findAll',
  FindOne: 'Products.findOne',
  Update: 'Products.update',
  Delete: 'Products.delete',
};

@Controller()
export class AppController {
  constructor(private readonly productsService: AppService) {}

  @MessagePattern({ cmd: ProductPatterns.FindAll })
  findAll(@Payload() { page, limit, sort, order }) {
    return this.productsService.findAll({ page, limit, sort, order });
  }
}
