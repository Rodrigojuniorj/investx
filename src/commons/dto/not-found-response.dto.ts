import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NotFoundResponse {
  @ApiProperty({
    description: 'status da requisição',
    example: 404,
  })
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem emitida',
    example: 'E-mail não existe ou dados estão incorretos',
  })
  message: string;

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Not Found',
  })
  error: string;
}
