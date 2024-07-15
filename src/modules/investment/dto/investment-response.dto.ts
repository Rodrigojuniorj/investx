import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WithdrawDto } from './withdraw.dto';

export class InvestmentResponseDto {
  @ApiProperty({
    description: 'Id do investimento',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Valor inicial',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  initialAmount: number;

  @ApiProperty({
    description: 'Valor atual',
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  currentAmount: number;

  @ApiProperty({
    description: 'Data do investimento, pode ser uma data anterior',
    example: '17/02/2024 10:00:00',
  })
  @IsNotEmpty()
  @IsString()
  investmentDate: string;

  @ApiProperty({
    description: 'Saldo esperado',
    example: 1020.96,
  })
  @IsNotEmpty()
  @IsNumber()
  balanceExpected: number;

  @ApiProperty({
    description: 'Valor restante',
    example: 20.96,
  })
  @IsNotEmpty()
  @IsNumber()
  remainingAmount: number;

  @ApiProperty({
    description: 'Detalhes da retirada',
    type: WithdrawDto,
  })
  @IsNotEmpty()
  withdraw: WithdrawDto;
}
