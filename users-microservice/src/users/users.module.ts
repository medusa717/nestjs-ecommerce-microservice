import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import the TypeOrmModule and register the User entity
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
