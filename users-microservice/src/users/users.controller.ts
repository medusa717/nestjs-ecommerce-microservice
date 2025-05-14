import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

export const UserPatters = {
  FindAll: 'Users.findAll',
  FindOne: 'Users.findOne',
  Create: 'Users.create',
  Update: 'Users.update',
  Delete: 'Users.delete',
};

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: UserPatters.Create })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: UserPatters.FindAll })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: UserPatters.FindOne })
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: UserPatters.Update })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: UserPatters.Delete })
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
