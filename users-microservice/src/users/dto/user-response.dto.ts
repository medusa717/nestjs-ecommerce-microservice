import { Expose } from 'class-transformer';
import { UserRole } from 'src/common/types/UserTypes';

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
