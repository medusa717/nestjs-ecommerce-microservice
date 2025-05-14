import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/interceptors/http-exception-filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API Gateway is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
