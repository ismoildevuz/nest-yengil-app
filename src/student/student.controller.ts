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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './models/student.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Create new Student' })
  @ApiResponse({ status: 201, type: Student })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Get all Students' })
  @ApiResponse({ status: 200, type: [Student] })
  @Get()
  findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.studentService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Student by ID' })
  @ApiResponse({ status: 200, type: Student })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Student by ID' })
  @ApiResponse({ status: 200, type: Student })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete Student by ID' })
  @ApiResponse({ status: 200, type: Student })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
