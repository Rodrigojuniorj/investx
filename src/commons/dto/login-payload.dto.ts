import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPayloadDto {
  @IsNotEmpty()
  @IsString()
  sub: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
