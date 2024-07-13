import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function swaggerDocumentation(app: NestExpressApplication) {
  // Configuração global do Bearer Auth
  const bearerAuthOptions: SecuritySchemeObject = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Token',
  };

  const baseOptions = new DocumentBuilder()
    .setTitle('Documentação do InvestX')
    .setDescription('Aqui estão todos os endpoints')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Investment')
    .addTag('Withdraw')
    .addBearerAuth(bearerAuthOptions, 'Bearer')
    .build();

  const baseDocument = SwaggerModule.createDocument(app, baseOptions);
  SwaggerModule.setup('/api/v1/documentation', app, baseDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
