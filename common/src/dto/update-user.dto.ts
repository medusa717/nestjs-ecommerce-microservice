import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsOptional()
  @IsStrongPassword(
    { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1 },
    { message: 'Password is not strong enough' },
  )
  password: string;

  @IsOptional()
  @Type(() => Date) // convert string to Date
  birthdate: Date;
}
