import { Test, TestingModule } from '@nestjs/testing';
import { AuthInMemoryRepository } from '@/modules/auth/repositories/in-memory/auth-in-memory.repository';
import { SignUpUseCase } from '../sign-up.use-case';

import { BadRequestException } from '@nestjs/common';
import { SignInUseCase } from '../sign-in.use-case';
import { TokenHelper } from '@/helpers/token.helper';
import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('SignIn', () => {
  let signInUseCase: SignInUseCase;
  let signUpUseCase: SignUpUseCase;
  let authRepository: AuthRepository;
  let tokenHelper: TokenHelper;
  let authInMemoryRepository: AuthInMemoryRepository;

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mocked_access_token'),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ACCESS_TOKEN') return 'secret';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        SignUpUseCase,
        TokenHelper,
        {
          provide: AuthRepository,
          useClass: AuthInMemoryRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    signInUseCase = module.get<SignInUseCase>(SignInUseCase);
    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
    authRepository = module.get<AuthRepository>(AuthRepository);
    tokenHelper = module.get<TokenHelper>(TokenHelper);
    authInMemoryRepository = new AuthInMemoryRepository();

    await signUpUseCase.execute({
      email: 'rodrigo@gmail.com',
      name: 'Rodrigo Junior',
      password: 'rodrigo123@',
    });
  });

  it('should be able to return an access token', async () => {
    const token = await signInUseCase.execute({
      email: 'rodrigo@gmail.com',
      password: 'rodrigo123@',
    });

    console.log(token);

    expect(token).toEqual(
      expect.objectContaining({
        access_token: 'mocked_access_token',
      }),
    );
  });

  it('should be able to return a warning if it tries if the credentials are invalid', async () => {
    await expect(
      signInUseCase.execute({
        email: 'rodrigo2@gmail.com',
        password: 'rodrigo123@2',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
