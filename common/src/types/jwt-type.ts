import { UserRole } from '../enums/user-role.enum';

export interface JwtPayload {
    sub: number; // User ID
    email: string; // User email
    role: UserRole; // User role
}
