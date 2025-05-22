import { Reflector } from '@nestjs/core';
import { UserRole, UserType } from '@my/common';
import { ROLES_KEY } from '../decorator/roles.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context
      .switchToHttp()
      .getRequest<Request & { user: UserType }>();
    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException('Yetkiniz bulunmamaktadır.');
    }
    return true;
  }
}
