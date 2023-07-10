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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './models/discount.model';

@ApiTags('Discount')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({ summary: 'Create new Discount' })
  @ApiResponse({ status: 201, type: Discount })
  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Get all Discounts' })
  @ApiResponse({ status: 200, type: [Discount] })
  @Get()
  async findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.discountService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Discount by ID' })
  @ApiResponse({ status: 200, type: Discount })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Discount by ID' })
  @ApiResponse({ status: 200, type: Discount })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Delete Discount by ID' })
  @ApiResponse({ status: 200, type: Discount })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
