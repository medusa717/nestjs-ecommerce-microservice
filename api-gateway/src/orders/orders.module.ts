import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'orders-microservice',
          port: 3040,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
