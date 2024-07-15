import { IsEnum, IsOptional } from 'class-validator';
import { BaseFilterDto } from '@/commons/dto/base-filter-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { InvestmentStatus } from '@prisma/client';

export class InvestmentFilterDto extends BaseFilterDto {
  @ApiPropertyOptional({
    description: 'status do investimento',
    example: InvestmentStatus.ATIVO,
    type: InvestmentStatus,
    enum: InvestmentStatus,
  })
  @IsOptional()
  @IsEnum(InvestmentStatus)
  status?: InvestmentStatus;
}
