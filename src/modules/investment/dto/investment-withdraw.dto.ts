import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { WithdrawResponseDto } from './withdraw.response.dto';

export class InvestmentWithdrawDto {
  @ApiProperty({
    description: 'Detalhes da retirada',
    type: WithdrawResponseDto,
  })
  @IsNotEmpty()
  withdraw: WithdrawResponseDto;

  @ApiProperty({
    description: 'Valor restante',
    example: 820.96,
  })
  @IsNotEmpty()
  @IsNumber()
  remainingAmount: number;
}
