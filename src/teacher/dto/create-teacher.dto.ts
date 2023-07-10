import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Teacher',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: '50',
    description: 'The salary percentage of the Teacher',
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  salary: number;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
