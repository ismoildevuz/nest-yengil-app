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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './models/group.model';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Create new Group' })
  @ApiResponse({ status: 201, type: Group })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'Get all Groups' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get()
  findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.groupService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Group by ID' })
  @ApiResponse({ status: 200, type: Group })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Group by ID' })
  @ApiResponse({ status: 200, type: Group })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Delete Group by ID' })
  @ApiResponse({ status: 200, type: Group })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
