import { lastValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserType } from 'src/common/types/UserTypes';

export const AuthPatterns = {
  Login: 'Auth.login',
  FindByEmail: 'Auth.findByEmail',
  Refresh: 'Auth.refresh',
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authMicroservice: ClientProxy,
  ) {}

  async validateUser(email: string, password: string) {
    return await lastValueFrom(
      this.authMicroservice.send(
        { cmd: AuthPatterns.FindByEmail },
        { email, password },
      ),
    );
  }

  async login(loginDto: LoginDto) {
    return await lastValueFrom(
      this.authMicroservice.send({ cmd: AuthPatterns.Login }, loginDto),
    );
  }

  async refreshToken(user: Partial<UserType>) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return await lastValueFrom(
      this.authMicroservice.send({ cmd: AuthPatterns.Refresh }, { payload }),
    );
  }
}
