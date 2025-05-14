export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  birthdate: Date;
  role: number;
}

export enum UserRole {
  GUEST = 1,
  USER = 2,
  SELLER = 3,
  ADMIN = 4,
  SUPER_ADMIN = 5,
}
