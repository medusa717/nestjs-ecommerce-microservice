import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwtStrategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      { ...SERVICES_CONFIG('AUTH'), transport: Transport.TCP },
      { ...SERVICES_CONFIG('USERS'), transport: Transport.TCP },
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
