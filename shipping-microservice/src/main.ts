import { SERVICES } from '@my/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'shipping',
        brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
      },
      consumer: {
        groupId: 'shipping-consumer',
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: SERVICES.SHIPPING.port,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(
    `Shipping microservice is running on port ${SERVICES.SHIPPING.port} and listening kafka events`,
  );
}
bootstrap();
