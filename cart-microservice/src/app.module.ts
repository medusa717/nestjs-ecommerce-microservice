import mongoose from 'mongoose';
import { AppService } from './app.service';
import { SERVICES_CONFIG } from '@my/common';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      { ...SERVICES_CONFIG('PRODUCTS'), transport: Transport.TCP },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        mongoose.connection.on('error', (error) => {
          const logger = new Logger('MongoDB');
          logger.error('MongoDB connection error:', error.message);
        });

        mongoose.connection.on('disconnected', () => {
          const logger = new Logger('MongoDB');
          logger.warn('MongoDB connection lost. Retrying...');
        });

        mongoose.connection.on('connected', () => {
          const logger = new Logger('MongoDB');
          logger.log('MongoDB connected successfully.');
        });

        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
