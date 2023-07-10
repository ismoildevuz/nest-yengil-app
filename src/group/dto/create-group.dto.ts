import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: 'Matematika',
    description: 'The name of the Group',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 300000,
    description: 'The price of the Group',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'Dushanba,Chorshanba,Juma',
    description: 'The lesson day of the Group',
  })
  @IsNotEmpty()
  @IsString()
  lesson_day: string;

  @ApiProperty({
    example: '16:00:00',
    description: 'The lesson time of the Group',
  })
  @IsNotEmpty()
  @IsString()
  lesson_time: string;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Group',
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({
    example: '2023-07-07',
    description: 'The date start of the Group',
  })
  @IsNotEmpty()
  @IsDateString()
  date_start: string;

  @ApiProperty({
    example: 'NFD45612',
    description: 'The Course ID of the Group',
  })
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @ApiProperty({
    example: 'BJN84589',
    description: 'The Teacher ID of the Group',
  })
  @IsNotEmpty()
  @IsString()
  teacher_id: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Group',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
