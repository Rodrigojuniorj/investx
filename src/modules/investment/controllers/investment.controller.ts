import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvestmentBodyDto } from '../dto/investment-body.dto';
import {
  CreateInvestmentUseCase,
  GetInvestmentByIdUseCase,
  InvestmentFilterUseCase,
} from '../use-cases';
import { GetCurrentUserId, Roles } from '@/commons/decorators';
import { InvestmentResponseDto } from '../dto/investment-response.dto';
import { InvestmentFilterDto } from '../dto/investment-filter.dto';

@ApiTags('Investment')
@ApiBearerAuth('Bearer')
@Controller('investments')
@Roles(['ADMINISTRATOR', 'USER'])
export class InvestmentController {
  constructor(
    private readonly createInvestmentUseCase: CreateInvestmentUseCase,
    private readonly getInvestmentByIdUseCase: GetInvestmentByIdUseCase,
    private readonly investmentFilterUseCase: InvestmentFilterUseCase,
  ) {}

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  async filter(
    @Query() query: InvestmentFilterDto,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.investmentFilterUseCase.execute(query, userId);
  }

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
