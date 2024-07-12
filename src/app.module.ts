import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestmentModule } from './modules/investment/investment.module';
import { AuthModule } from './modules/auth/auth.module';
import { envSchema } from '@/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    InvestmentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
