import { Controller, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseDatePipe } from '../common/pipes/parseDate';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CapitalizeNamePipe } from '../common/pipes/capitalizeName';

export const UserPatterns = {
  FindAll: 'Users.findAll',
  FindOne: 'Users.findOne',
  Create: 'Users.create',
  Update: 'Users.update',
  Delete: 'Users.delete',
};

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: UserPatterns.Create })
  createUser(
    @Payload('name', CapitalizeNamePipe) name: string,
    @Payload('birthdate', ParseDatePipe) birthdate: Date,
    @Payload() newUser: CreateUserDto,
  ) {
    newUser.name = name;
    newUser.birthdate = birthdate;
    return this.usersService.create(newUser);
  }

  @MessagePattern({ cmd: UserPatterns.FindAll })
  findAll(@Payload() { page, limit, sort, order }) {
    return this.usersService.findAll({ page, limit, sort, order });
  }

  @MessagePattern({ cmd: UserPatterns.FindOne })
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: UserPatterns.Update })
  update(@Payload() { id, updateUserDto }) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: UserPatterns.Delete })
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
