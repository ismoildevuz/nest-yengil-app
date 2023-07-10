import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Guruhga qo’shildi',
    description: 'The title of the Message',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! Sizning oylik to’lovdan umumiy qarzdorligingiz (SUM). O’qishni davom ettirishingiz uchun to’lovni amalga oshirishingizni so’raymiz. Hurmat bilan (MARKAZ).',
    description: 'The body of the Message',
  })
  @IsNotEmpty()
  @IsString()
  body: string;
}
