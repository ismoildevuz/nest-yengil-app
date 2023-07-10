import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    example: 'Guruhga qo’shildi',
    description: 'The title of the Message',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example:
      'Assalomu alaykum (STUDENT)! (MARKAZ)’ining  (GROUP)’ida o’qishga qabul qilindingiz.  Dars kunlari: (DAYS) Dars vaqti: (HOURS) To’lov miqdori: (SUM) Ustoz: (TEACHER)',
    description: 'The body of the Message',
  })
  @IsOptional()
  @IsString()
  body?: string;
}
