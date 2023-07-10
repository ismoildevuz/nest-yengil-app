import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Guruhga qo’shildi',
    description: 'The title of the Message',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! (MARKAZ)’ining  (GROUP)’ida o’qishga qabul qilindingiz.  Dars kunlari: (DAYS) Dars vaqti: (HOURS) To’lov miqdori: (SUM) Ustoz: (TEACHER)',
    description: 'The body of the Message',
  })
  @IsNotEmpty()
  @IsString()
  body: string;
}
