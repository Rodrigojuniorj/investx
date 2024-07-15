import { Module } from '@nestjs/common';
import { InvestmentController } from './controllers/investment.controller';
import { CacheModule } from '@/cache/cache.module';
import { PrismaService } from '@/prisma/prisma.service';
import { InvestmentRepository } from './repositories/investment.repository';
import { InvestmentPrismaRepository } from './repositories/prisma/investment-prisma.repository';
import {
  CreateInvestmentUseCase,
  CreateWithdrawUseCase,
  GetInvestmentByIdUseCase,
  InvestmentFilterUseCase,
} from './use-cases';
import { WithdrawController } from './controllers/withdraw.controller';
import { WithdrawRepository } from './repositories/withdraw.repository';
import { WithdrawPrismaRepository } from './repositories/prisma/withdraw-prisma.repository';

@Module({
  imports: [CacheModule],
  controllers: [InvestmentController, WithdrawController],
  providers: [
    PrismaService,
    {
      provide: InvestmentRepository,
      useClass: InvestmentPrismaRepository,
    },
    {
      provide: WithdrawRepository,
      useClass: WithdrawPrismaRepository,
    },
    CreateInvestmentUseCase,
    GetInvestmentByIdUseCase,
    CreateWithdrawUseCase,
    InvestmentFilterUseCase,
  ],
})
export class InvestmentModule {}
