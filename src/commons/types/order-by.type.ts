import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class OrderBy {
  @ApiProperty({
    description: 'Campo para ordenação',
    example: 'createdAt',
  })
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'otherField']) // Adicione outros campos conforme necessário
  field: string;

  @ApiProperty({
    description: 'Direção da ordenação',
    example: 'asc',
  })
  @IsString()
  @IsIn(['asc', 'desc'])
  direction: 'asc' | 'desc';
}
