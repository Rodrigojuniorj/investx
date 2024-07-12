import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthResponseDto {
  @ApiProperty({
    description: 'token de acesso ao sistema',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZTcxODcwZC1lM2Q0LTRmZWYtYjBjYy04NjQ1NTViOTQwNTkiLCJlbWFpbCI6InJvZHJpZ290YXZhcmVzZnJhbmNvQGdtYWlsLmNv',
  })
  @IsNotEmpty()
  accessToken: string;
}
