import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { OrdersService } from './orders.service';
import { ClientsModule } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      SERVICES_CONFIG('ORDERS'),
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
