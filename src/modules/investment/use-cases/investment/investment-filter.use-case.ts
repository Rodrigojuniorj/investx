import { Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../../repositories/investment.repository';
import { InvestmentFilterDto } from '../../dto/investment-filter.dto';

@Injectable()
export class InvestmentFilterUseCase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(query: InvestmentFilterDto) {
    return await this.investmentRepository.filterInvestment(query);
  }
}
