import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        synchronize: process.env.NODE_ENV === 'development',
        autoLoadEntities: process.env.NODE_ENV === 'development',
        entities: [__dirname + '/**/entities/*.entity.ts'],
        logging: process.env.NODE_ENV === 'development',
        cache: { duration: 1000 },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
