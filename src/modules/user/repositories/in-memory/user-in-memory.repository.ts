import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { UserRepository } from '../user.repository';
import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  public users: UserDto[] = [];

  constructor() {}

  async findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email) || null;
  }

  async deleteUser(userId) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new BadRequestException('Erro ao deletar o usuário');
    }
    this.users.splice(userIndex, 1);
  }

  async updateUser(userId, data) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new BadRequestException('Erro ao editar o usuário');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      email: data.email,
      name: data.name,
      hash: data.password,
    };
  }

  async filterUser(query): Promise<BaseFilterResponseDto<UserDto>> {
    let filteredUsers = this.users;

    if (query.name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(query.name.toLowerCase()),
      );
    }

    if (query.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(query.email.toLowerCase()),
      );
    }

    const pageNumber = query.pageNumber || 1;
    const pageSize = query.pageSize || 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(
      startIndex,
      startIndex + pageSize,
    );

    return {
      content: [],
      numberOfElements: 2,
      pageNumber: 2,
      pageSize: 2,
      totalElements: 2,
      totalPages: 2,
    };
  }
}
