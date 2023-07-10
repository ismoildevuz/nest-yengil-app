import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './models/teacher.model';
import { InjectModel } from '@nestjs/sequelize';
import { EduCenterService } from '../edu_center/edu_center.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher)
    private readonly teacherRepository: typeof Teacher,
    private readonly eduCenterService: EduCenterService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { edu_center_id } = createTeacherDto;
    await this.eduCenterService.getOne(edu_center_id);
    const newTeacher = await this.teacherRepository.create({
      id: await this.generateUniqueId(),
      ...createTeacherDto,
    });
    return this.getOne(newTeacher.id);
  }

  async findAll(edu_center_id: string) {
    if (!edu_center_id) {
      throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
    }
    return this.teacherRepository.findAll({
      where: { edu_center_id },
      attributes: ['id', 'full_name', 'phone', 'salary', 'telegram', 'note'],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    await this.getOne(id);
    await this.teacherRepository.update(updateTeacherDto, { where: { id } });
    return this.getOne(id);
  }

  async remove(id: string) {
    const teacher = await this.getOne(id);
    await this.teacherRepository.destroy({ where: { id } });
    return teacher;
  }

  async getOne(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      attributes: ['id', 'full_name', 'phone', 'salary', 'telegram', 'note'],
    });
    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return teacher;
  }

  async generateId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const prefix =
      letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length));
    const suffix = Math.floor(Math.random() * 90000) + 10000;
    return prefix + suffix;
  }

  async generateUniqueId() {
    const allUniqueId = await this.teacherRepository.findAll({
      attributes: ['id'],
    });
    let id: any;
    while (true) {
      id = await this.generateId();
      if (!allUniqueId.includes(id)) {
        break;
      }
    }
    return id;
  }
}
