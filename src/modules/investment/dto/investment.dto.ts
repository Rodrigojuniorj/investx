import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { UserDto } from './user.dto';

export class InvestmentDto {
  @ApiProperty({
    description: 'Id do item',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Usuário',
    example: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'Valor inicial',
    example: 100.0,
  })
  @IsNotEmpty()
  @IsNumber()
  initialAmount: number;

  @ApiProperty({
    description: 'Valor atual',
    example: 120.0,
  })
  @IsNumber()
  currentAmount?: number;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-10-08 14:34:39.701',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro',
    example: '2023-10-08 15:34:39.701',
  })
  @IsDate()
  updatedAt: Date;
}
