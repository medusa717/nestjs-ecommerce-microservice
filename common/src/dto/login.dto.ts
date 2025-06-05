import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'User email',
        example: 'john@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'StrongP@ss123',
        minLength: 6,
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
