import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth.repository';
import { UserBodyDto } from '../../dto/user-body.dto';
import { generateHash } from '@/commons/utils/generate-hash.util';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(data: UserBodyDto): Promise<void> {
    const user = await this.authRepository.findByEmail(data.email);

    if (user) {
      throw new BadRequestException(
        'Já existe alguém cadastrado com esse e-mail',
      );
    }

    const hash = await generateHash(data.password);

    await this.authRepository.createUser(data, hash);
  }
}
