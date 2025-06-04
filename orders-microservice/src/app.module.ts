import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AppController } from './app.controller';
import { SERVICES_CONFIG, SERVICES } from '@my/common';
import { OrderItem } from './entities/orderItems.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersKafkaProducerService } from './orders-kafka-producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
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
    ClientsModule.register([
      {
        ...SERVICES_CONFIG('KAFKA'),
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
          },
        },
      },
      { ...SERVICES_CONFIG('PRODUCTS'), transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, OrdersKafkaProducerService],
})
export class AppModule {}
