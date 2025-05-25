import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule, OrdersModule, CartModule, ShippingModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
