import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
    })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'john@example.com',
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'StrongP@ss123',
        minLength: 8,
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1 }, { message: 'Password is not strong enough' })
    password: string;

    @ApiProperty({
        description: 'User birthdate',
        example: '01/01/1990',
        required: false,
    })
    @IsOptional()
    @Type(() => Date) // convert string to Date
    birthdate: Date;

    @IsOptional()
    @IsString()
    role: string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
