import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartPatterns } from './common/patterns/cart.patterns';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: CartPatterns.Create })
  create(dto: any) {
    return this.appService.create(dto);
  }

  @MessagePattern({ cmd: CartPatterns.GetCart })
  getCart(userId: number) {
    return this.appService.getCart(userId);
  }

  @MessagePattern({ cmd: CartPatterns.Update })
  update(dto: any) {
    return this.appService.update(dto);
  }

  @MessagePattern({ cmd: CartPatterns.Delete })
  delete(userId: number) {
    return this.appService.delete(userId);
  }
}
