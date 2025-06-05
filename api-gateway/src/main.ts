import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/interceptors/http-exception-filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setVersion('1.0')
    .setTitle('E-commerce Microservice API')
    .setDescription(
      `
      This is the API documentation for the E-commerce Microservice application.
      
      The application consists of the following microservices:
      - Users Service: Handles user management and authentication
      - Products Service: Manages product catalog
      - Orders Service: Processes orders and order history
      - Cart Service: Manages shopping cart functionality
      - Shipping Service: Handles shipping information
      
      All endpoints that require authentication use JWT Bearer token.
    `,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'E-commerce API Documentation',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API Gateway is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
