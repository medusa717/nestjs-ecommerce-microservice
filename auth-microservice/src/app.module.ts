import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { SERVICES_CONFIG } from '@my/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      { ...SERVICES_CONFIG('USERS'), transport: Transport.TCP },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        return {
          secret: jwtSecret!,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
