import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth.repository';
import { tokens } from '@/commons/types';
import * as bcrypt from 'bcrypt';
import { TokenHelper } from '@/helpers/token.helper';
import { AuthDto } from '../../dto/auth.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenHelper: TokenHelper,
  ) {}

  async execute(data: AuthDto): Promise<tokens> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException('E-mail ou senha incorretos!');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.hash);

    if (!passwordMatches) {
      throw new BadRequestException('E-mail ou senha incorretos!');
    }

    const tokens = await this.tokenHelper.getTokens(user);

    return tokens;
  }
}
