import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/commons/decorators/roles.decorator';
import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';
import { UserDto } from '../dto/user.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import {
  UserDeleteUseCase,
  UserFilterUseCase,
  UserUpdateUseCase,
} from '../use-cases';
import { GetCurrentUser } from '@/commons/decorators';
import { JwtPayload } from '@/commons/types';
import { UserUpdateBodyDto } from '../dto/user-update-body.dto';

@ApiTags('User')
@ApiBearerAuth('Bearer')
@Controller('users')
export class UserController {
  constructor(
    private readonly userFilterDto: UserFilterUseCase,
    private readonly userUpdateUseCase: UserUpdateUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
  ) {}

  @Roles(['ADMINISTRATOR'])
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: BaseFilterResponseDto,
    status: 200,
  })
  async filter(
    @Query() query: UserFilterDto,
  ): Promise<BaseFilterResponseDto<UserDto>> {
    return await this.userFilterDto.execute(query);
  }

  @Roles(['ADMINISTRATOR', 'USER'])
  @Post('/:userId/update')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body() data: UserUpdateBodyDto,
    @Param('userId') userId: number,
    @GetCurrentUser() payload: JwtPayload,
  ): Promise<void> {
    return await this.userUpdateUseCase.execute(userId, data, payload);
  }

  @Roles(['ADMINISTRATOR', 'USER'])
  @Delete('/:userId/delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param('userId') userId: number,
    @GetCurrentUser() payload: JwtPayload,
  ): Promise<void> {
    return await this.userDeleteUseCase.execute(userId, payload);
  }
}
