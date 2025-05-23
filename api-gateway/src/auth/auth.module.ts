import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwtStrategy';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      SERVICES_CONFIG('AUTH'),
      SERVICES_CONFIG('USERS'),
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
