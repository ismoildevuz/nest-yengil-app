import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the Teacher',
  })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Teacher',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: '50',
    description: 'The salary percentage of the Teacher',
  })
  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  salary?: number;

  @ApiProperty({
    example: '@john77',
    description: 'The telegram username of the Teacher',
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Teacher',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
