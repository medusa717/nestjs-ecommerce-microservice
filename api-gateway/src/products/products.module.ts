import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('PRODUCTS'), transport: Transport.TCP },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
