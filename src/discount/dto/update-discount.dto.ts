import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateDiscountDto {
  @ApiProperty({
    example: 55000,
    description: 'The price of the Discount',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
