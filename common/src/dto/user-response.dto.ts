import { Expose } from 'class-transformer';
import { UserRole } from '../enums/user-role.enum';

export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    role: UserRole;

    @Expose()
    birthdate: Date;
}
