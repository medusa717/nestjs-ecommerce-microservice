import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string): Date {
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format. Use DD/MM/YYYY.');
    }

    return date;
  }
}
