import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from 'src/common/types/JwtType';
import { UserPatterns, UserResponseDto, UserType, LoginDto } from '@my/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_MICROSERVICE')
    private readonly usersMicroservice: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string, password: string) {
    const user = await lastValueFrom(
      this.usersMicroservice.send({ cmd: UserPatterns.FindByEmail }, { email }),
    );
    if (!user) return null;

    const hashedPassword = bcrypt.compareSync(password, user.password);
    if (user && hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByEmail(loginDto.email, loginDto.password);
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async refreshToken(user: Partial<UserType>) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const userData = await lastValueFrom(
      this.usersMicroservice.send(
        { cmd: UserPatterns.FindByEmail },
        { email: user.email },
      ),
    );

    return {
      user: new UserResponseDto({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        birthdate: userData.birthdate,
      }),
      accessToken: this.jwtService.sign(payload), // Geneerate new JWT token
    };
  }
}
