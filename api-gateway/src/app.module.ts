import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
