import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
        required: false,
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'john@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'StrongP@ss123',
        required: false,
        minLength: 8,
    })
    @IsOptional()
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

    constructor(partial: Partial<UpdateUserDto>) {
        Object.assign(this, partial);
    }
}
