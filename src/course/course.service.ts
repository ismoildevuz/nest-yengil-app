import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './models/course.model';
import { EduCenterService } from '../edu_center/edu_center.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseRepository: typeof Course,
    private readonly eduCenterService: EduCenterService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const { edu_center_id } = createCourseDto;
      await this.eduCenterService.getOne(edu_center_id);
      const newCourse = await this.courseRepository.create({
        id: await this.generateUniqueId(),
        ...createCourseDto,
      });
      return this.getOne(newCourse.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(edu_center_id: string) {
    try {
      if (!edu_center_id) {
        throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
      }
      await this.eduCenterService.getOne(edu_center_id);
      return this.courseRepository.findAll({
        where: { edu_center_id },
        attributes: ['id', 'name'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      await this.getOne(id);
      await this.courseRepository.update(updateCourseDto, { where: { id } });
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const course = await this.getOne(id);
      await this.courseRepository.destroy({ where: { id } });
      return course;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        attributes: ['id', 'name'],
      });
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      return course;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateId() {
    try {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const prefix =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
      const suffix = Math.floor(Math.random() * 90000) + 10000;
      return prefix + suffix;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateUniqueId() {
    try {
      const allUniqueId = await this.courseRepository.findAll({
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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
