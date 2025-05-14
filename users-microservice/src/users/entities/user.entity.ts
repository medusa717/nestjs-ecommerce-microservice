import { Column, Entity } from 'typeorm';
import { UserRole } from '../../common/types/UserTypes';
import { BaseEntity } from 'src/common/entities/BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  birthdate: Date;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
