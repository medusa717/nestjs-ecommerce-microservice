import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // User repository
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new RpcException({
        status: 'error',
        message: 'User already exists',
        code: 400,
      });
    }

    const saltRounds = this.configService.get<number>('PASSWORD_SALT', 10);
    const salt = await bcrypt.genSalt(Number(saltRounds));
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt); // Hash the password

    createUserDto.password = hashedPassword; // Set the hashed password in the DTO
    const newUser = this.userRepository.create(createUserDto); // Create a new user instance
    const savedUser = await this.userRepository.save(newUser); // Save the new user to the database

    return plainToInstance(UserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll({ page, limit, sort, order }): Promise<UserResponseDto[]> {
    const offset = page * limit;

    const users = await this.userRepository
      .createQueryBuilder('user')
      .orderBy(`user.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new RpcException({
        status: 'error',
        message: 'User not found',
        code: 404,
      }); // Check if user exists

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    user: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser)
      throw new RpcException({
        status: 'error',
        message: 'User not found',
        code: 404,
      });

    const updatedUser: User = {
      ...existingUser,
      ...Object.fromEntries(
        Object.entries(user).filter(([_, value]) => value !== undefined),
      ),
    };

    const updateUser = await this.userRepository.save(updatedUser); // Save the updated user to the database
    return plainToInstance(UserResponseDto, updateUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<UserResponseDto | null> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser)
      throw new RpcException({
        status: 'error',
        message: 'User not found',
        code: 404,
      });

    await this.userRepository.delete(id); // Delete the user from the database
    return plainToInstance(UserResponseDto, existingUser, {
      excludeExtraneousValues: true,
    });
  }
}
