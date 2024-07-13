import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WithdrawHistoryDto {
  @ApiProperty({
    description: 'ID do histórico de retirada',
    example: 8,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Valor retirado',
    example: 77.5,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Valor da retirada',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  withdraw: number;

  @ApiProperty({
    description: 'Data da criação',
    example: '12/07/2024 23:49:50',
  })
  @IsNotEmpty()
  @IsString()
  createdAt: string;
}
