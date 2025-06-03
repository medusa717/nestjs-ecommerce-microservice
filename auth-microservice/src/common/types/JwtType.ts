import { UserRole } from '@my/common';

export interface JwtPayload {
  sub: number; // User ID
  email: string; // User email
  role: UserRole; // User role
}
