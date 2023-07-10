import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './models/student.model';
import { InjectModel } from '@nestjs/sequelize';
import { EduCenterService } from '../edu_center/edu_center.service';
import { GroupService } from './../group/group.service';
import { Group } from '../group/models/group.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private readonly studentRepository: typeof Student,
    private readonly groupService: GroupService,
    private readonly eduCenterService: EduCenterService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { group_id, edu_center_id } = createStudentDto;
    await this.groupService.getOne(group_id);
    await this.eduCenterService.getOne(edu_center_id);
    const newStudent = await this.studentRepository.create({
      id: await this.generateUniqueId(),
      ...createStudentDto,
    });
    return this.getOne(newStudent.id);
  }

  async findAll(edu_center_id: string) {
    if (!edu_center_id) {
      throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
    }
    return this.studentRepository.findAll({
      where: { edu_center_id },
      attributes: ['id', 'full_name', 'phone', 'note', 'status', 'createdAt'],
      include: [
        {
          model: Group,
          attributes: ['id', 'name', 'price', 'lesson_day', 'lesson_time'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const { group_id } = updateStudentDto;
    await this.getOne(id);
    if (group_id) {
      await this.groupService.getOne(group_id);
    }
    await this.studentRepository.update(updateStudentDto, { where: { id } });
    return this.getOne(id);
  }

  async remove(id: string) {
    const student = await this.getOne(id);
    await this.studentRepository.destroy({ where: { id } });
    return student;
  }

  async getOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id },
      attributes: ['id', 'full_name', 'phone', 'note', 'status', 'createdAt'],
      include: [
        {
          model: Group,
          attributes: ['id', 'name', 'price', 'lesson_day', 'lesson_time'],
        },
      ],
    });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
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
    const allUniqueId = await this.studentRepository.findAll({
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
