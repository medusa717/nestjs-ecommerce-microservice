import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('CART'), transport: Transport.TCP },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
