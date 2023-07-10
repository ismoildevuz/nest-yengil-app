import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 325000,
    description: 'The price of the Payment',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Payment',
  })
  @IsNotEmpty()
  @IsString()
  note: string;

  @ApiProperty({
    example: 'March',
    description: 'The month of the Payment',
  })
  @IsNotEmpty()
  @IsString()
  for_month: string;

  @ApiProperty({
    example: 'BGJ54322',
    description: 'The Student ID of the Payment',
  })
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Payment',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
