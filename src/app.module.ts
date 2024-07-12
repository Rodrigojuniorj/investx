import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestmentModule } from './modules/investment/investment.module';
import { AuthModule } from './modules/auth/auth.module';
import { envSchema } from '@/env';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@/commons/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    InvestmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
