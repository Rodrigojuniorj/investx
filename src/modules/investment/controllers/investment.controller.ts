import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvestmentBodyDto } from '../dto/investment-body.dto';
import {
  CreateInvestmentUseCase,
  GetInvestmentByIdUseCase,
} from '../use-cases';
import { GetCurrentUserId, Roles } from '@/commons/decorators';
import { InvestmentResponseDto } from '../dto/investment-response.dto';

@ApiTags('Investment')
@ApiBearerAuth('Bearer')
@Controller('investments')
@Roles(['ADMINISTRATOR', 'USER'])
export class InvestmentController {
  constructor(
    private readonly createInvestmentUseCase: CreateInvestmentUseCase,
    private readonly getInvestmentByIdUseCase: GetInvestmentByIdUseCase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createInvestment(
    @Body() data: InvestmentBodyDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    await this.createInvestmentUseCase.execute(data, userId);
  }

  @Get(':id')
  async getInvestmentById(
    @Param('id') id: number,
    @GetCurrentUserId() userId: number,
  ): Promise<InvestmentResponseDto> {
    return await this.getInvestmentByIdUseCase.execute(id, userId);
  }
}
