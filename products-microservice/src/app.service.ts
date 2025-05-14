import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll({ page, limit, sort, order }): string {
    return 'Hello World!';
  }
}
