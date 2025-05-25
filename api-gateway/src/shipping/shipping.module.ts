import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('SHIPPING'), transport: Transport.TCP },
    ]),
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
