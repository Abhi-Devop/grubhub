import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  
  // Use compression for shrinking JSON payloads
  app.use(compression());

  // Use Helmet for standard HTTP security headers
  app.use(helmet());

  // Set up global validation pipe for strict DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip out properties that don't have decorators
      forbidNonWhitelisted: true, // throw error if non-whitelisted properties are present
      transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  // Custom Middleware for logging
  app.use((req: any, res: any, next: any) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000', 
      'http://localhost:3000', 
      'http://127.0.0.1:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
