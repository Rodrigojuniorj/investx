import { InvestmentWithdrawDto } from '../dto/investment-withdraw.dto';

export abstract class WithdrawRepository {
  abstract withdrawFromInvestment(
    investmentId: number,
    amount: number,
    userId: number,
  ): Promise<InvestmentWithdrawDto>;
}
