import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { AuthRepository } from '../auth.repository';
import { UserBodyDto } from '../../dto/user-body.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthInMemoryRepository implements AuthRepository {
  public users: UserDto[] = [];

  constructor() {}

  async findByEmail(email: string): Promise<UserDto> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async createUser(data: UserBodyDto, hash: string): Promise<void> {
    const userExists = this.users.find((user) => user.email === data.email);
    if (userExists) {
      throw new BadRequestException('Usuário já existe');
    }

    const newUser: UserDto = {
      id: randomInt(1000),
      email: data.email,
      name: data.name,
      role: 'USER',
      hash: hash,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.users.push(newUser);

    if (!newUser) {
      throw new BadRequestException('Erro ao criar o usuário');
    }
  }
}
