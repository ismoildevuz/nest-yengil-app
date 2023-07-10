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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create new Payment' })
  @ApiResponse({ status: 201, type: Payment })
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all Payments' })
  @ApiResponse({ status: 200, type: [Payment] })
  @Get()
  async findAll(@Query('edu_center_id') edu_center_id: string) {
    return this.paymentService.findAll(edu_center_id);
  }

  @ApiOperation({ summary: 'Get Payment by ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Payment by ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete Payment by ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
