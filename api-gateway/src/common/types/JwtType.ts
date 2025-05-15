import { UserRole } from './UserTypes';

export interface JwtPayload {
  sub: number; // User ID
  email: string; // User email
  role: UserRole; // User role
}
