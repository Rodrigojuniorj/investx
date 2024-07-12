import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestmentModule } from './modules/investment/investment.module';
import { AuthModule } from './modules/auth/auth.module';
import { envSchema } from '@/env';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from '@/commons/guards';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    InvestmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
