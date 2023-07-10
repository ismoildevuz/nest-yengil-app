import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEduCenterMessageDto {
  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! Sizning oylik to’lovdan umumiy qarzdorligingiz (SUM). O’qishni davom ettirishingiz uchun to’lovni amalga oshirishingizni so’raymiz. Hurmat bilan (MARKAZ).',
    description: 'The body of the Edu Center Message',
  })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Edu Center Message',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;

  @ApiProperty({
    example: 'JFV65446',
    description: 'The Message ID of the Edu Center Message',
  })
  @IsNotEmpty()
  @IsString()
  message_id: string;
}
