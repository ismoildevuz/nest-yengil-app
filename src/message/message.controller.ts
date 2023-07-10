import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './models/message.model';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Create new Message' })
  @ApiResponse({ status: 201, type: Message })
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @ApiOperation({ summary: 'Get all Messages' })
  @ApiResponse({ status: 200, type: [Message] })
  @Get()
  async findAll() {
    return this.messageService.findAll();
  }

  @ApiOperation({ summary: 'Get Message by ID' })
  @ApiResponse({ status: 200, type: Message })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Message by ID' })
  @ApiResponse({ status: 200, type: Message })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @ApiOperation({ summary: 'Delete Message by ID' })
  @ApiResponse({ status: 200, type: Message })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
