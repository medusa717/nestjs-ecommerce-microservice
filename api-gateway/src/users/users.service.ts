import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export const UserPatters = {
  FindAll: 'Users.findAll',
  FindOne: 'Users.findOne',
  Create: 'Users.create',
  Update: 'Users.update',
  Delete: 'Users.delete',
};

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE')
    private readonly usersMicroservice: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersMicroservice.send(
      { cmd: UserPatters.Create },
      createUserDto,
    );
  }

  findAll() {
    return this.usersMicroservice.send({ cmd: UserPatters.FindAll }, {});
  }

  findOne(id: number) {
    return this.usersMicroservice.send({ cmd: UserPatters.FindOne }, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersMicroservice.send(
      { cmd: UserPatters.Update },
      updateUserDto,
    );
  }

  remove(id: number) {
    return this.usersMicroservice.send({ cmd: UserPatters.Delete }, id);
  }
}
