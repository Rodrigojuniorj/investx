import { BaseFilterResponseDto } from '@/commons/dto/base-filter-response.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserDto } from '../dto/user.dto';
import { UserUpdateBodyDto } from '../dto/user-update-body.dto';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserDto>;

  abstract findById(id: number): Promise<UserDto>;

  abstract filterUser(
    query: UserFilterDto,
  ): Promise<BaseFilterResponseDto<UserDto>>;

  abstract updateUser(userId: number, data: UserUpdateBodyDto): Promise<void>;

  abstract deleteUser(userId: number): Promise<void>;
}
