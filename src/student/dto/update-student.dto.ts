import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the Student',
  })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Student',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Student',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    example: 'requested',
    description: 'The status of the Student',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    example: 'BGJ54322',
    description: 'The Group ID of the Student',
  })
  @IsOptional()
  @IsString()
  group_id?: string;
}
