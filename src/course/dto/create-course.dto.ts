import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Matematika',
    description: 'The name of the Course',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Course',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
