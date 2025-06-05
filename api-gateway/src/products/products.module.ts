import { Module } from '@nestjs/common';
import { SERVICES_CONFIG } from '@my/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsService } from './products.service';
import { redisStore } from 'cache-manager-redis-store';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { ...SERVICES_CONFIG('PRODUCTS'), transport: Transport.TCP },
    ]),
    CacheModule.register({
      store: redisStore,
      host: 'redis', // Docker Compose'daki Redis servisinin adı
      port: 6379,
      ttl: 3600, // Varsayılan cache ömrü saniye cinsinden (örn: 1 saat)
      max: 100, // Cache'te tutulacak maksimum öğe sayısı (isteğe bağlı)
      isGlobal: true, // Cache'i global olarak kullanmak için
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
