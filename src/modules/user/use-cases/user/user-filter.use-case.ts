import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserDto } from '../../dto/user.dto';
import { UserFilterDto } from '../../dto/user-filter.dto';
import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';

@Injectable()
export class UserFilterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(query: UserFilterDto): Promise<BaseFilterResponseDto<UserDto>> {
    return await this.userRepository.filterUser(query);
  }
}
