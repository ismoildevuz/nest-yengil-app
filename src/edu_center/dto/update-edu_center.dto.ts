import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateEduCenterDto {
  @ApiProperty({
    example: 'Cambridge',
    description: 'The name of the Edu Center',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Edu Center',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: 'Uzbek1&t0n',
    description: 'The password of the Edu Center',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
