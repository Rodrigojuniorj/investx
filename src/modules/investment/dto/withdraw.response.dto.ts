import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WithdrawResponseDto {
  @ApiProperty({
    description: 'ID da retirada',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Valor retirado',
    example: 155,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Valor da retirada',
    example: 200,
  })
  @IsNotEmpty()
  @IsNumber()
  withdraw: number;

  @ApiProperty({
    description: 'Data da criação',
    example: '13/07/2024 00:07:10',
  })
  @IsNotEmpty()
  @IsString()
  createdAt: string;
}
