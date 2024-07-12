import { Role, tokens } from '@/commons/types';
import { Env } from '@/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type TUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

@Injectable()
export class TokenHelper {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService<Env, true>,
  ) {}

  async getTokens(user: TUser): Promise<tokens> {
    const at = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      {
        secret: this.config.get('ACCESS_TOKEN', { infer: true }),
        expiresIn: 60 * 60 * 24 * 7, // 1 week
      },
    );

    return {
      access_token: at,
    };
  }
}
