import { Role } from '@/commons/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Id do item',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Rodrigo Junior',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'rodrigo@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role do usuário',
  })
  role: Role;

  @ApiProperty({
    description: 'Hash da senha gerada que o usuário enviou',
    example: '$2b$08$ijHdZgb72132uePfa919MbFq4B.1ym1OPNfUlrm4bZkpe',
  })
  @IsNotEmpty()
  hash: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-10-08 14:34:39.701',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro',
    example: '2023-10-08 15:34:39.701',
  })
  @IsDate()
  updatedAt: Date;
}
