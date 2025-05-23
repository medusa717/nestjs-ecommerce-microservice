import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { ProductsService } from './products.service';
import { ClientsModule } from '@nestjs/microservices';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      SERVICES_CONFIG('PRODUCTS'),
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
