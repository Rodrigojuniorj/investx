import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterResponseDto<T> {
  content: T[];

  @ApiProperty({
    description: 'Quantidade de itens na listagem',
    example: 10,
  })
  @IsNumber()
  numberOfElements: number;

  @ApiProperty({
    description: 'Número da página buscada',
    example: 1,
  })
  @IsNumber()
  pageNumber: number;

  @ApiProperty({
    description: 'Quantidade de item buscada',
    example: 10,
  })
  @IsNumber()
  pageSize: number;

  @ApiProperty({
    description:
      'Quantidade total de itens que existe no banco de dados, conforme o filtro',
    example: 100,
  })
  @IsNumber()
  totalElements: number;

  @ApiProperty({
    description: 'Quantidade total de páginas possíveis utilizando os filtros',
    example: 10,
  })
  @IsNumber()
  totalPages: number;
}
