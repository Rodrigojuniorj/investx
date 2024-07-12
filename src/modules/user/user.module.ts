import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AtStrategy } from './strategies';
import { UserRepository } from './repositories/user.repository';
import { UserFilterUseCase } from './use-cases';
import { TokenHelper } from '@/helpers/token.helper';
import { UserController } from './controllers/user.controller';
import { CacheModule } from '@/cache/cache.module';
import { UserPrismaRepository } from './repositories/prisma/auth-prisma.repository';

@Module({
  imports: [CacheModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    AtStrategy,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    TokenHelper,
    UserFilterUseCase,
  ],
})
export class UserModule {}
