import { Injectable } from '@nestjs/common';
import { InvestmentRepository } from '../../repositories/investment.repository';
import { InvestmentResponseDto } from '../../dto/investment-response.dto';

@Injectable()
export class GetInvestmentByIdUseCase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(id: number, userId: number): Promise<InvestmentResponseDto> {
    return await this.investmentRepository.getInvestmentById(id, userId);
  }
}
