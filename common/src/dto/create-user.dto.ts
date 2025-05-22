import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword(
        { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1 },
        { message: 'Password is not strong enough' }
    )
    password: string;

    @IsOptional()
    @Type(() => Date) // convert string to Date
    birthdate: Date;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
