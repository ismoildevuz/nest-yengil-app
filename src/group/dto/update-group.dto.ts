import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    example: 'Matematika',
    description: 'The name of the Group',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 300000,
    description: 'The price of the Group',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    example: 'odd',
    description: 'The lesson day of the Group',
  })
  @IsOptional()
  @IsString()
  lesson_day?: string;

  @ApiProperty({
    example: '16:00:00',
    description: 'The lesson time of the Group',
  })
  @IsOptional()
  @IsString()
  lesson_time?: string;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Group',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    example: '2023-07-07T00:27:38.507Z',
    description: 'The date start of the Group',
  })
  @IsOptional()
  @IsDateString()
  date_start?: string;

  @ApiProperty({
    example: 'NFD45612',
    description: 'The Course ID of the Group',
  })
  @IsOptional()
  @IsString()
  course_id?: string;

  @ApiProperty({
    example: 'BJN84589',
    description: 'The Teacher ID of the Group',
  })
  @IsOptional()
  @IsString()
  teacher_id?: string;
}
