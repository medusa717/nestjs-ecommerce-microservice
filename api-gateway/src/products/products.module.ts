import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { ClientsModule } from '@nestjs/microservices';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'products-microservice',
          port: 3030,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
