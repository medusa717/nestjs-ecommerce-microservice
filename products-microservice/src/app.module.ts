import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Product } from './entities/product.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductImage } from './entities/product_image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Product, ProductImage]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
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
        };
        return dbConfig;
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: 'redis', // Docker Compose'daki Redis servisinin adı
      port: 6379,
      ttl: 3600, // Varsayılan cache ömrü saniye cinsinden (örn: 1 saat)
      max: 100, // Cache'te tutulacak maksimum öğe sayısı (isteğe bağlı)
      isGlobal: true, // Cache'i global olarak kullanmak için
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
