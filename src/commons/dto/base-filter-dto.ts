import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class BaseFilterDto {
  @ApiProperty({
    description: 'Número do paginador',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  pageNumber: number;

  @ApiProperty({
    description: 'Quantidade de itens que deve ser retornado',
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  pageSize: number;
}
