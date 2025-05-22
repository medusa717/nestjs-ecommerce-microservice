import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '@my/common';

const userData = {
  id: 1,
  name: 'John Doe',
  role: 3,
};

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = userData; // Replace with actual user retrieval logic
    if (
      !user ||
      (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)
    ) {
      // If the user is not a super admin, throw a ForbiddenException
      throw new ForbiddenException('You are not allowed to do this action.');
    }
    return true;
  }
}
