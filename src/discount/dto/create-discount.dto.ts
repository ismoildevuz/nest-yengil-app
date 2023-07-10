import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({
    example: 55000,
    description: 'The price of the Discount',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 'BGJ54322',
    description: 'The Group ID of the Discount',
  })
  @IsNotEmpty()
  @IsString()
  group_id: string;

  @ApiProperty({
    example: 'BGJ54322',
    description: 'The Student ID of the Discount',
  })
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @ApiProperty({
    example: 'NVP43391',
    description: 'The Edu Center ID of the Discount',
  })
  @IsNotEmpty()
  @IsString()
  edu_center_id: string;
}
