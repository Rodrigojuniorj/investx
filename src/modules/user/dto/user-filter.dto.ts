import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from '@/commons/dto/base-filter-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserFilterDto extends BaseFilterDto {
  @ApiPropertyOptional({
    description: 'Nome do usuário',
    example: 'Rodrigo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'email do usuário',
    example: 'exemple@test.com',
  })
  @IsOptional()
  @IsString()
  email?: string;
}
