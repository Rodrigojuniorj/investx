import { InvestmentBodyDto } from '../dto/investment-body.dto';
import { InvestmentResponseDto } from '../dto/investment-response.dto';

export abstract class InvestmentRepository {
  abstract createInvestment(
    data: InvestmentBodyDto,
    userId: number,
  ): Promise<void>;

  abstract getInvestmentById(
    investmentId: number,
    userId,
  ): Promise<InvestmentResponseDto>;
}
