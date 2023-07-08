import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginEduCenterDto {
  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the Edu Center',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Uzbek1&t0n',
    description: 'The password of the Edu Center',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
