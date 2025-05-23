import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      SERVICES_CONFIG('CART'),
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
