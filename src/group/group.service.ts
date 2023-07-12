import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './models/group.model';
import { InjectModel } from '@nestjs/sequelize';
import { EduCenterService } from '../edu_center/edu_center.service';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';
import { CourseService } from './../course/course.service';
import { TeacherService } from './../teacher/teacher.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group)
    private readonly groupRepository: typeof Group,
    private readonly courseService: CourseService,
    private readonly teacherService: TeacherService,
    private readonly eduCenterService: EduCenterService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const { course_id, teacher_id, edu_center_id } = createGroupDto;
      await this.courseService.getOne(course_id);
      await this.teacherService.getOne(teacher_id);
      await this.eduCenterService.getOne(edu_center_id);
      const newGroup = await this.groupRepository.create({
        id: await this.generateUniqueId(),
        ...createGroupDto,
      });
      return this.getOne(newGroup.id);
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
      return this.groupRepository.findAll({
        where: { edu_center_id },
        attributes: [
          'id',
          'name',
          'price',
          'lesson_day',
          'lesson_time',
          'note',
          'date_start',
        ],
        include: [
          {
            model: Course,
            attributes: ['id', 'name'],
          },
          {
            model: Teacher,
            attributes: ['id', 'full_name'],
          },
        ],
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

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    try {
      const { course_id, teacher_id } = updateGroupDto;
      await this.getOne(id);
      if (course_id) {
        await this.courseService.getOne(course_id);
      }
      if (teacher_id) {
        await this.teacherService.getOne(teacher_id);
      }
      await this.groupRepository.update(updateGroupDto, { where: { id } });
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const group = await this.getOne(id);
      await this.groupRepository.destroy({ where: { id } });
      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const group = await this.groupRepository.findOne({
        where: { id },
        attributes: [
          'id',
          'name',
          'price',
          'lesson_day',
          'lesson_time',
          'note',
          'date_start',
        ],
        include: [
          {
            model: Course,
            attributes: ['id', 'name'],
          },
          {
            model: Teacher,
            attributes: ['id', 'full_name'],
          },
        ],
      });
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
      return group;
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
      const allUniqueId = await this.groupRepository.findAll({
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
