import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    example: 'Guruhga qo’shildi',
    description: 'The title of the Message',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! Sizning oylik to’lovdan umumiy qarzdorligingiz (SUM). O’qishni davom ettirishingiz uchun to’lovni amalga oshirishingizni so’raymiz. Hurmat bilan (MARKAZ).',
    description: 'The body of the Message',
  })
  @IsOptional()
  @IsString()
  body?: string;
}
