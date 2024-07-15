import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { generateHash } from '@/commons/utils/generate-hash.util';
import { UserRepository } from '../../repositories/user.repository';
import { JwtPayload } from '@/commons/types';
import { UserUpdateBodyDto } from '../../dto/user-update-body.dto';

@Injectable()
export class UserUpdateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: number,
    data: UserUpdateBodyDto,
    payload: JwtPayload,
  ): Promise<void> {
    if (userId !== payload.sub && payload.role === 'USER') {
      throw new ForbiddenException(
        'Você não tem permissão para editar esse usuário',
      );
    }

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const userEmailExists = await this.userRepository.findByEmail(data.email);

    if (
      userExists &&
      data.email === userExists.email &&
      userExists.id !== userEmailExists.id
    ) {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com esse e-mail!',
      );
    }

    if (data.password) {
      data.password = await generateHash(data.password);
    } else {
      data.password = userExists.hash;
    }

    await this.userRepository.updateUser(userExists.id, data);
  }
}
