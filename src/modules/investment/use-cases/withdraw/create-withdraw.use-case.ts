import { Injectable } from '@nestjs/common';
import { WithdrawRepository } from '../../repositories/withdraw.repository';
import { InvestmentWithdrawDto } from '../../dto/investment-withdraw.dto';

@Injectable()
export class CreateWithdrawUseCase {
  constructor(private readonly withdrawRepository: WithdrawRepository) {}

  async execute(
    investmentId: number,
    amount: number,
    userId: number,
  ): Promise<InvestmentWithdrawDto> {
    return await this.withdrawRepository.withdrawFromInvestment(
      investmentId,
      amount,
      userId,
    );
  }
}
