import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'E-mail utilizado para fazer login do usuário cadastrado',
    example: 'rodrigo@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha utilizada para fazer login do usuário cadastrado',
    example: 'rodrigo123',
  })
  @IsNotEmpty()
  password: string;
}
