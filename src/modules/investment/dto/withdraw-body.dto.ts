import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawBodyDto {
  @ApiProperty({
    description: 'Valor de retirada',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
