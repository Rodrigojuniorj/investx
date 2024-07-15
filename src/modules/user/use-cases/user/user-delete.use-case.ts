import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { JwtPayload } from '@/commons/types';

@Injectable()
export class UserDeleteUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number, payload: JwtPayload): Promise<void> {
    if (userId !== payload.sub && payload.role === 'USER') {
      throw new ForbiddenException(
        'Você não tem permissão para deletar esse usuário',
      );
    }

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado');
    }

    await this.userRepository.deleteUser(userId);
  }
}
