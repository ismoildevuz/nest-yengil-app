import { Injectable } from '@nestjs/common';
import { CreateEduCenterDto } from './dto/create-edu_center.dto';
import { UpdateEduCenterDto } from './dto/update-edu_center.dto';
import { EduCenter } from './models/edu_center.model';
import { InjectModel } from '@nestjs/sequelize';
import { LoginEduCenterDto } from './dto/login-edu_center.dto';

@Injectable()
export class EduCenterService {
  constructor(
    @InjectModel(EduCenter)
    private readonly eduCenterRepository: typeof EduCenter,
  ) {}

  async login(loginEduCenterDto: LoginEduCenterDto) {
    return 'This action adds a new eduCenter';
  }

  async create(createEduCenterDto: CreateEduCenterDto) {
    return 'This action adds a new eduCenter';
  }

  async findAll() {
    return `This action returns all eduCenter`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} eduCenter`;
  }

  async update(
    id: string,
    updateEduCenterDto: UpdateEduCenterDto,
    image: Express.Multer.File,
  ) {
    return `This action updates a #${id} eduCenter`;
  }

  async remove(id: string) {
    return `This action removes a #${id} eduCenter`;
  }
}
