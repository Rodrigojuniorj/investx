import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { UserRepository } from '../user.repository';
import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';
import { UserFilterDto } from '../../dto/user-filter.dto';
import { Prisma } from '@prisma/client';
import { PrismaHelper } from '@/helpers/prisma.helper';
import { generateCacheKey } from '@/commons/utils/generate-cache-key.util';
import { CacheRepository } from '@/cache/cache-repository';
import { UserUpdateBodyDto } from '../../dto/user-update-body.dto';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
  ) {}

  async findById(id: number): Promise<UserDto> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      await this.cache.invalidateCache(`user-query-*`);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Erro ao deletar o usuário');
    }
  }

  async updateUser(userId: number, data: UserUpdateBodyDto): Promise<void> {
    const update = await this.prisma.user.update({
      data: {
        email: data.email,
        name: data.name,
        hash: data.password,
      },
      where: {
        id: userId,
      },
    });

    if (!update) {
      throw new BadRequestException('Erro ao editar o usuário');
    }

    await this.cache.invalidateCache(`user-query-*`);
  }

  async filterUser(
    query: UserFilterDto,
  ): Promise<BaseFilterResponseDto<UserDto>> {
    const cacheKey = generateCacheKey(`user-query`, query);

    const cacheExists = await this.cache.get(cacheKey);
    if (cacheExists) {
      const cacheData = JSON.parse(cacheExists);
      return cacheData;
    }
    const where: Prisma.UserWhereInput = {};
    const select: Prisma.UserSelect = {
      id: true,
      name: true,
      email: true,
      role: true,
    };

    if (query.name) {
      where.name = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    if (query.email) {
      where.email = {
        contains: query.email,
        mode: 'insensitive',
      };
    }

    const users = await PrismaHelper.paginate<
      UserDto,
      Prisma.UserWhereInput,
      Prisma.UserSelect
    >(this.prisma.user, where, select, {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    });

    await this.cache.set(cacheKey, JSON.stringify(users));

    return users;
  }
}
