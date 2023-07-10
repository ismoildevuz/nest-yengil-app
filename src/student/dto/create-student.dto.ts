import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the Student',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Student',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Student',
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({
    example: 'requested',
    description: 'The status of the Student',
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    example: 'BGJ54322',
    description: 'The Group ID of the Student',
  })
  @IsNotEmpty()
  @IsString()
  group_id: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Student',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
