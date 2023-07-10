import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EduCenterMessageService } from './edu_center_message.service';
import { CreateEduCenterMessageDto } from './dto/create-edu_center_message.dto';
import { UpdateEduCenterMessageDto } from './dto/update-edu_center_message.dto';

@Controller('edu-center-message')
export class EduCenterMessageController {
  constructor(
    private readonly eduCenterMessageService: EduCenterMessageService,
  ) {}

  @Post()
  async create(@Body() createEduCenterMessageDto: CreateEduCenterMessageDto) {
    return this.eduCenterMessageService.create(createEduCenterMessageDto);
  }

  @Get()
  async findAll() {
    return this.eduCenterMessageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eduCenterMessageService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEduCenterMessageDto: UpdateEduCenterMessageDto,
  ) {
    return this.eduCenterMessageService.update(id, updateEduCenterMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eduCenterMessageService.remove(id);
  }
}
