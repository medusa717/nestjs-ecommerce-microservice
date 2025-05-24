import { SERVICES } from '@my/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notifications',
          brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: 'notifications-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log(`Notifications microservice is listening the kafka events`);
}
bootstrap();
