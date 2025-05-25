import { ShippingService } from './shipping.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.findOne(id);
  }
}
