import { Request } from 'express';
import { UserRole } from '@my/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

interface RequestWithUser extends Request {
  user: {
    id: number;
    role: UserRole;
  };
}

@Injectable()
export class OwnerOrRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const paramId = Number(request.params.id);

    if (!user) throw new ForbiddenException('Kullanıcı doğrulanamadı');

    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isRoleAllowed = user.role && allowedRoles?.includes(user.role);
    const isOwner = user.id === paramId;

    if (isOwner || isRoleAllowed) return true;

    throw new ForbiddenException(
      'Bu işlemi yapmak için yetkiniz bulunmamaktadır.',
    );
  }
}
