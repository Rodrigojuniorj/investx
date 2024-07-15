import { BadRequestException, Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../../repositories/investment.repository';
import { InvestmentBodyDto } from '../../dto/investment-body.dto';

@Injectable()
export class CreateInvestmentUseCase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(data: InvestmentBodyDto, userId: number): Promise<void> {
    if (data.initialAmount < 0) {
      throw new BadRequestException('O valor inicial não pode ser negativo');
    }

    return await this.investmentRepository.createInvestment(data, userId);
  }
}
