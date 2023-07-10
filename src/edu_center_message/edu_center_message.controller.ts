import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EduCenterMessageService } from './edu_center_message.service';
import { CreateEduCenterMessageDto } from './dto/create-edu_center_message.dto';
import { UpdateEduCenterMessageDto } from './dto/update-edu_center_message.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EduCenterMessage } from './models/edu_center_message.model';

@ApiTags('Edu Center Message')
@Controller('edu-center-message')
export class EduCenterMessageController {
  constructor(
    private readonly eduCenterMessageService: EduCenterMessageService,
  ) {}

  @ApiOperation({ summary: 'Create new Edu Center Message' })
  @ApiResponse({ status: 201, type: EduCenterMessage })
  @Post()
  async create(@Body() createEduCenterMessageDto: CreateEduCenterMessageDto) {
    return this.eduCenterMessageService.create(createEduCenterMessageDto);
  }

  @ApiOperation({ summary: 'Get all Edu Center Messages' })
  @ApiResponse({ status: 200, type: [EduCenterMessage] })
  @Get()
  async findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.eduCenterMessageService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Edu Center Message by ID' })
  @ApiResponse({ status: 200, type: EduCenterMessage })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eduCenterMessageService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Edu Center Message by ID' })
  @ApiResponse({ status: 200, type: EduCenterMessage })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEduCenterMessageDto: UpdateEduCenterMessageDto,
    image: Express.Multer.File,
  ) {
    return this.eduCenterMessageService.update(id, updateEduCenterMessageDto);
  }

  @ApiOperation({ summary: 'Delete Edu Center Message by ID' })
  @ApiResponse({ status: 200, type: EduCenterMessage })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eduCenterMessageService.remove(id);
  }
}
