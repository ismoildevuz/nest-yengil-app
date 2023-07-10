import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEduCenterMessageDto {
  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! Sizning oylik to’lovdan umumiy qarzdorligingiz (SUM). O’qishni davom ettirishingiz uchun to’lovni amalga oshirishingizni so’raymiz. Hurmat bilan (MARKAZ).',
    description: 'The body of the Edu Center Message',
  })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({
    example: true,
    description: 'The status of the Edu Center Message',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
