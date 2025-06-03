import { Expose, Type, Exclude } from 'class-transformer';
import { UserRole } from '../enums/user-role.enum';

@Exclude()
export class UserResponseDto {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    email!: string;

    @Expose()
    @Type(() => Number)
    role!: UserRole;

    @Expose()
    @Type(() => Date)
    birthdate!: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
