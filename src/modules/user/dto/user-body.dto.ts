import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserBodyDto {
  @ApiProperty({
    description: 'Nome para cadastro do usuário',
    example: 'Rodrigo Junior',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'E-mail para cadastro do usuário',
    example: 'rodrigo@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha para cadastro do usuário',
    example: 'rodrigo123@',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/.*[!@#$%^&*(),.?":{}|<>].*/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  password: string;
}
