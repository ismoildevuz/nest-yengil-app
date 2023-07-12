import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';
import { GroupService } from './../group/group.service';
import { StudentService } from '../student/student.service';
import { EduCenterService } from '../edu_center/edu_center.service';
import { Group } from '../group/models/group.model';
import { Student } from '../student/models/student.model';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount)
    private readonly discountRepository: typeof Discount,
    private readonly groupService: GroupService,
    private readonly studentService: StudentService,
    private readonly eduCenterService: EduCenterService,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    try {
      const { group_id, student_id, edu_center_id } = createDiscountDto;
      await this.groupService.getOne(group_id);
      await this.studentService.getOne(student_id);
      await this.eduCenterService.getOne(edu_center_id);
      const newDiscount = await this.discountRepository.create({
        id: await this.generateUniqueId(),
        ...createDiscountDto,
      });
      return this.getOne(newDiscount.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(edu_center_id: string) {
    try {
      if (!edu_center_id) {
        throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
      }
      return this.discountRepository.findAll({
        where: { edu_center_id },
        attributes: ['id', 'price'],
        include: [
          {
            model: Group,
            attributes: ['id', 'name', 'price'],
          },
          {
            model: Student,
            attributes: ['id', 'full_name', 'phone'],
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

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    try {
      await this.getOne(id);
      await this.discountRepository.update(updateDiscountDto, {
        where: { id },
      });
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const discount = await this.getOne(id);
      await this.discountRepository.destroy({ where: { id } });
      return discount;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const discount = await this.discountRepository.findOne({
        where: { id },
        attributes: ['id', 'price'],
        include: [
          {
            model: Group,
            attributes: ['id', 'name', 'price'],
          },
          {
            model: Student,
            attributes: ['id', 'full_name'],
          },
        ],
      });
      if (!discount) {
        throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
      }
      return discount;
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
      const allUniqueId = await this.discountRepository.findAll({
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
