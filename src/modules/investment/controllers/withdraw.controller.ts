import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateWithdrawUseCase } from '../use-cases';
import { GetCurrentUserId, Roles } from '@/commons/decorators';
import { WithdrawBodyDto } from '../dto/withdraw-body.dto';
import { InvestmentWithdrawDto } from '../dto/investment-withdraw.dto';

@ApiTags('Withdraw')
@ApiBearerAuth('Bearer')
@Controller('withdraw')
@Roles(['ADMINISTRATOR', 'USER'])
export class WithdrawController {
  constructor(private readonly createWithdrawUseCase: CreateWithdrawUseCase) {}

  @Post('/investment/:investmentId')
  @HttpCode(HttpStatus.CREATED)
  async createInvestment(
    @Param('investmentId') investmentId: number,
    @Body() data: WithdrawBodyDto,
    @GetCurrentUserId() userId: number,
  ): Promise<InvestmentWithdrawDto> {
    return this.createWithdrawUseCase.execute(
      investmentId,
      data.amount,
      userId,
    );
  }
}
