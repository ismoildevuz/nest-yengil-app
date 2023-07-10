import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEduCenterMessageDto {
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
