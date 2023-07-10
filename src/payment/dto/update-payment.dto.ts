import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({
    example: 325000,
    description: 'The price of the Payment',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    example: 'Some note',
    description: 'The note of the Payment',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    example: 'payed',
    description: 'The status of the Payment',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    example: 'March',
    description: 'The month of the Payment',
  })
  @IsOptional()
  @IsString()
  for_month?: string;

  @ApiProperty({
    example: '2023-07-07T00:27:38.507Z',
    description: 'The date payed of the Payment',
  })
  @IsOptional()
  @IsDateString()
  date_payed?: string;
}
