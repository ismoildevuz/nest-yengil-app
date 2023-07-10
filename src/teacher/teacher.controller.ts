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
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Teacher } from './models/teacher.model';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Create new Teacher' })
  @ApiResponse({ status: 201, type: Teacher })
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Get all Teachers' })
  @ApiResponse({ status: 200, type: [Teacher] })
  @Get()
  async findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.teacherService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Teacher by ID' })
  @ApiResponse({ status: 200, type: Teacher })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Teacher by ID' })
  @ApiResponse({ status: 200, type: Teacher })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Delete Teacher by ID' })
  @ApiResponse({ status: 200, type: Teacher })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
