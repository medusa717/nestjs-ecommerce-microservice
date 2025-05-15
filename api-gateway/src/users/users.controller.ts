import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jtw-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/types/UserTypes';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { SuperAdminGuard } from 'src/auth/guards/super-admin.guard';
import { OwnerOrRolesGuard } from 'src/auth/guards/owner-or-roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 0,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('sort') sort: string = 'id',
    @Query('order') order: string = 'asc',
  ) {
    return this.usersService.findAll({ page, limit, sort, order });
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
