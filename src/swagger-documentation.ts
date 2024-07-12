import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AppModule } from './app.module';

export function swaggerDocumentation(app: NestExpressApplication) {
  // Configuração global do Bearer Auth
  const bearerAuthOptions: SecuritySchemeObject = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Token',
  };

  const baseOptions = new DocumentBuilder()
    .setTitle('Documentação User')
    .setDescription('Aqui estão todos os endpoints dos usuários')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth(bearerAuthOptions, 'Bearer')
    .build();

  const baseDocument = SwaggerModule.createDocument(app, baseOptions, {
    include: [AppModule],
  });
  SwaggerModule.setup('/api/v1/documentation', app, baseDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
