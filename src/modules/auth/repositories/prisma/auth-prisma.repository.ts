import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { AuthRepository } from '../auth.repository';
import { UserBodyDto } from '../../dto/user-body.dto';
import { CacheRepository } from '@/cache/cache-repository';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
  ) {}

  async findByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: UserBodyDto, hash: string): Promise<void> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: 'USER',
        hash,
      },
    });

    if (!user) {
      throw new BadRequestException('Erro ao criar o usuário');
    }

    await this.cache.invalidateCache(`user-query-${user.id}-*`);
  }
}
