import { ShippingService } from './shipping.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('shipping')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get shipping information by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns shipping information for the specified ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Shipping information not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.findOne(id);
  }
}
