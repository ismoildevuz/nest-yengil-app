import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EduCenterService } from './edu_center.service';
import { CreateEduCenterDto } from './dto/create-edu_center.dto';
import { UpdateEduCenterDto } from './dto/update-edu_center.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EduCenter } from './models/edu_center.model';
import { LoginEduCenterDto } from './dto/login-edu_center.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Edu Center')
@Controller('edu-center')
export class EduCenterController {
  constructor(private readonly eduCenterService: EduCenterService) {}

  @ApiOperation({ summary: 'Log in Edu Center' })
  @ApiResponse({ status: 200, type: EduCenter })
  @Post('signin')
  async login(@Body() loginEduCenterDto: LoginEduCenterDto) {
    return this.eduCenterService.login(loginEduCenterDto);
  }

  @ApiOperation({ summary: 'Create new Edu Center' })
  @ApiResponse({ status: 201, type: EduCenter })
  @Post()
  async create(@Body() createEduCenterDto: CreateEduCenterDto) {
    return this.eduCenterService.create(createEduCenterDto);
  }

  @ApiOperation({ summary: 'Get all Edu Centers' })
  @ApiResponse({ status: 200, type: [EduCenter] })
  @Get()
  async findAll() {
    return this.eduCenterService.findAll();
  }

  @ApiOperation({ summary: 'Get Edu Center by ID' })
  @ApiResponse({ status: 200, type: EduCenter })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eduCenterService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Edu Center by ID' })
  @ApiResponse({ status: 200, type: EduCenter })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateEduCenterDto: UpdateEduCenterDto,
    @UploadedFile(new ImageValidationPipe())
    image: Express.Multer.File,
  ) {
    return this.eduCenterService.update(id, updateEduCenterDto, image);
  }

  @ApiOperation({ summary: 'Delete Edu Center by ID' })
  @ApiResponse({ status: 200, type: EduCenter })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eduCenterService.remove(id);
  }

  @ApiOperation({ summary: 'Delete Edu Center Image by ID' })
  @ApiResponse({ status: 200, type: EduCenter })
  @Delete(':id/image')
  async removeImage(@Param('id') id: string) {
    return this.eduCenterService.removeImage(id);
  }
}
