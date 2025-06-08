import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { ShippingModule } from './shipping/shipping.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ResponseInterceptor } from './common/interceptors/transform-response.interceptor';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    CartModule,
    ShippingModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
