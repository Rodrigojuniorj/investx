import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';
import { ValidationPipe } from '@nestjs/common';
import { swaggerDocumentation } from '@/swagger-documentation';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import reteLimit from 'express-rate-limit';

const limiter = reteLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.enableCors();

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('PORT', { infer: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('/api/v1');

  swaggerDocumentation(app);

  app.use(helmet());
  app.use(limiter);
  await app.listen(port);
}
bootstrap();
