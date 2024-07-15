import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InvestmentBodyDto {
  @ApiProperty({
    description: 'Valor inicial',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  initialAmount: number;

  @ApiProperty({
    description: 'Data do investimento, pode ser uma data anterior',
    example: '17/02/2022 10:00:00',
  })
  @IsNotEmpty()
  @IsString()
  investmentDate: string;
}
