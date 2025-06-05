import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShippingStatus } from '../enums/shipping-status.enum';

export class UpdateShippingDto {
    @ApiProperty({
        description: 'The new status of the shipping',
        enum: ShippingStatus,
        example: ShippingStatus.IN_TRANSIT,
    })
    @IsEnum(ShippingStatus)
    status: ShippingStatus;
}
