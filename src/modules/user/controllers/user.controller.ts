import { Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/commons/decorators/roles.decorator';
import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';
import { UserDto } from '../dto/user.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserFilterUseCase } from '../use-cases';

@ApiTags('User')
@ApiBearerAuth('Bearer')
@Controller('users')
export class UserController {
  constructor(private readonly userFilterDto: UserFilterUseCase) {}

  @Roles(['ADMINISTRATOR'])
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: BaseFilterResponseDto,
    status: 200,
  })
  async signIn(
    @Query() query: UserFilterDto,
  ): Promise<BaseFilterResponseDto<UserDto>> {
    return await this.userFilterDto.execute(query);
  }
}
