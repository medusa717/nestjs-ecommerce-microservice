import { lastValueFrom } from 'rxjs';
import { UserPatterns } from '@my/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from 'src/common/types/JwtType';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_MICROSERVICE')
    private readonly usersMicroservice: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await lastValueFrom(
      this.usersMicroservice.send(
        { cmd: UserPatterns.FindOne },
        { id: Number(payload.sub) },
      ),
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
