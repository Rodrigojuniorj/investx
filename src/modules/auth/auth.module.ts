import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { AtStrategy } from './strategies';
import { AuthRepository } from './repositories/auth.repository';
import { AuthPrismaRepository } from './repositories/prisma/auth-prisma.repository';
import { SignInUseCase, SignUpUseCase } from './use-cases';
import { TokenHelper } from '@/helpers/token.helper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const secreteKey = config.get('ACCESS_TOKEN', { infer: true });

        return {
          secret: secreteKey,
          signOptions: {
            expiresIn: 60 * 60 * 24 * 7,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AtStrategy,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    },
    TokenHelper,
    SignInUseCase,
    SignUpUseCase,
  ],
})
export class AuthModule {}
