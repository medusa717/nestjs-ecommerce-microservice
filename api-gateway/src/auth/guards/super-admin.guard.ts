import { Observable } from 'rxjs';
import { UserRole } from '@my/common';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

const userData = {
  id: 1,
  name: 'John Doe',
  role: UserRole.SUPER_ADMIN,
};

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (request.method === 'DELETE') {
      const user = userData; // Replace with actual user retrieval logic
      if (!user || user.role !== UserRole.SUPER_ADMIN) {
        // If the user is not a super admin, throw a ForbiddenException
        throw new ForbiddenException('You are not allowed to delete users.');
      }
    } else if (request.method === 'PUT') {
      if (body.role !== undefined) {
        const user = userData; // Replace with actual user retrieval logic
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
