import { Observable } from 'rxjs';
import { UserRole } from '@my/common';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    const user = request.user;

    if (request.method === 'DELETE') {
      if (!user || user.role !== UserRole.SUPER_ADMIN) {
        // If the user is not a super admin, throw a ForbiddenException
        throw new ForbiddenException('You are not allowed to delete users.');
      }
    } else if (request.method === 'PUT') {
      if (body.role !== undefined) {
        if (!user || user.role !== UserRole.SUPER_ADMIN) {
          // If the user is not an admin, throw a ForbiddenException
          throw new ForbiddenException(
            'You are not allowed to update the role.',
          );
        }
      }
    }

    return true;
  }
}
