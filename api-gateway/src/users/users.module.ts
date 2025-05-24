import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('USERS'), transport: Transport.TCP },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
