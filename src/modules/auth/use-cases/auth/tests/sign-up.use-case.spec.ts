import { AuthInMemoryRepository } from '@/modules/auth/repositories/in-memory/auth-in-memory.repository';
import { SignUpUseCase } from '../sign-up.use-case';
import { compare } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

let signUpUseCase: SignUpUseCase;
let authInMemoryRepository: AuthInMemoryRepository;

describe('Create user', () => {
  beforeEach(() => {
    authInMemoryRepository = new AuthInMemoryRepository();
    signUpUseCase = new SignUpUseCase(authInMemoryRepository);
  });

  it('Should be able to create user', async () => {
    expect(authInMemoryRepository.users).toEqual([]);

    await signUpUseCase.execute({
      email: 'rodrigo@gmail.com',
      name: 'Rodrigo Junior',
      password: 'rodrigo123@',
    });

    expect(authInMemoryRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'rodrigo@gmail.com',
        }),
      ]),
    );
  });

  it('Should be able to create user with password encypted', async () => {
    const userPasswordWithoutEncryption = 'rodrigo123@';

    await signUpUseCase.execute({
      email: 'rodrigo@gmail.com',
      name: 'Rodrigo Junior',
      password: userPasswordWithoutEncryption,
    });

    const user = await authInMemoryRepository.findByEmail('rodrigo@gmail.com');

    const userHasPasswordEncypted = await compare(
      userPasswordWithoutEncryption,
      user.hash,
    );

    expect(userHasPasswordEncypted).toBeTruthy();
  });

  it('should not allow creating user with same email', async () => {
    await signUpUseCase.execute({
      email: 'rodrigo@gmail.com',
      name: 'Rodrigo Junior',
      password: 'rodrigo123@',
    });

    await expect(
      signUpUseCase.execute({
        email: 'rodrigo@gmail.com',
        name: 'Rodrigo Junior2',
        password: 'rodrigo123@',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
