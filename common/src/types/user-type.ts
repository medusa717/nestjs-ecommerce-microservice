import { UserRole } from 'enums/user-role.enum';

export interface UserType {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    birthdate: Date;
    role: UserRole;
}
