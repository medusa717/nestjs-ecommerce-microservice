import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserPatterns } from '@my/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE')
    private readonly usersMicroservice: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersMicroservice.send(
      { cmd: UserPatterns.Create },
      createUserDto,
    );
  }

  findAll({ page, limit, sort, order }) {
    return this.usersMicroservice.send(
      { cmd: UserPatterns.FindAll },
      { page, limit, sort, order },
    );
  }

  findOne(id: number) {
    return this.usersMicroservice.send({ cmd: UserPatterns.FindOne }, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersMicroservice.send(
      { cmd: UserPatterns.Update },
      { id, updateUserDto },
    );
  }

  remove(id: number) {
    return this.usersMicroservice.send({ cmd: UserPatterns.Delete }, id);
  }
}
