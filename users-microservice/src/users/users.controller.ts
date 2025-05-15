import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseDatePipe } from 'src/common/pipes/convertDate';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserPatterns } from 'src/common/patterns/userPatterns';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalizeName';

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
  findOne(@Payload() { id }: { id: number }) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: UserPatterns.FindByEmail })
  findByEmail(@Payload() { email }: { email: string }) {
    return this.usersService.findByEmail(email);
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
