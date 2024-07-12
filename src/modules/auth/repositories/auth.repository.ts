import { UserBodyDto } from '../dto/user-body.dto';
import { UserDto } from '../dto/user.dto';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<UserDto>;

  abstract createUser(data: UserBodyDto, hash: string): Promise<void>;
}
