import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'Matematika',
    description: 'The name of the Course',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
