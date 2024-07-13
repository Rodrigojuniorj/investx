import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { WithdrawHistoryDto } from './withdraw-history.dto';

export class WithdrawDto {
  @ApiProperty({
    description: 'Histórico de retiradas',
    type: [WithdrawHistoryDto],
  })
  @IsNotEmpty()
  @IsArray()
  history: WithdrawHistoryDto[];

  @ApiProperty({
    description: 'Total retirado',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  totalWithdrawalAmount: number;

  @ApiProperty({
    description: 'Total retirado com desconto',
    example: 775,
  })
  @IsNotEmpty()
  @IsNumber()
  totalWithdrawalAmountWithDiscount: number;
}
