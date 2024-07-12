import { tokens } from '@/commons/types';
import { Env } from '@/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type TUser = {
  id: number;
  name: string;
  email: string;
};

@Injectable()
export class TokenHelper {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService<Env, true>,
  ) {}

  async getTokens(user: TUser): Promise<tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        {
          secret: this.config.get('ACCESS_TOKEN', { infer: true }),
          expiresIn: 60 * 60 * 24 * 7, // 1 week
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
        },
        {
          secret: this.config.get('REFRESH_TOKEN', { infer: true }),
          expiresIn: 60 * 60 * 24 * 30, // 1 month
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
