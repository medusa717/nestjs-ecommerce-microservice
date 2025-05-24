import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('ORDERS'), transport: Transport.TCP },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
