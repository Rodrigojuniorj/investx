import { Public } from '@/commons/decorators';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { tokens } from '@/commons/types';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase, SignUpUseCase } from '../use-cases';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserBodyDto } from '../dto/user-body.dto';

@ApiTags('Auth')
@ApiBearerAuth('Bearer')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: AuthResponseDto,
    status: 200,
  })
  @ApiResponse({
    type: BadRequestException,
    status: 400,
  })
  async signIn(@Body() data: AuthDto): Promise<tokens> {
    return await this.signInUseCase.execute(data);
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
  })
  async signUp(@Body() data: UserBodyDto): Promise<void> {
    await this.signUpUseCase.execute(data);
  }
}
