import { ShippingPatterns } from '@my/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ShippingService {
  constructor(
    @Inject('SHIPPING_MICROSERVICE')
    private readonly shippingMicroservice: ClientProxy,
  ) {}

  findOne(id: number) {
    return this.shippingMicroservice.send(
      { cmd: ShippingPatterns.FindOne },
      { id },
    );
  }
}
