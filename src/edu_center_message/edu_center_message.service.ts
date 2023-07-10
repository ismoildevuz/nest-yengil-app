import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateEduCenterMessageDto } from './dto/create-edu_center_message.dto';
import { UpdateEduCenterMessageDto } from './dto/update-edu_center_message.dto';
import { EduCenterMessage } from './models/edu_center_message.model';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../message/models/message.model';
import { MessageService } from '../message/message.service';
import { EduCenterService } from './../edu_center/edu_center.service';

@Injectable()
export class EduCenterMessageService {
  constructor(
    @InjectModel(EduCenterMessage)
    private readonly eduCenterMessageRepository: typeof EduCenterMessage,
    @Inject(forwardRef(() => EduCenterService))
    private readonly eduCenterService: EduCenterService,
    private readonly messageService: MessageService,
  ) {}

  async create(createEduCenterMessageDto: CreateEduCenterMessageDto) {
    const { edu_center_id, message_id } = createEduCenterMessageDto;
    await this.eduCenterService.getOne(edu_center_id);
    const message = await this.messageService.getOne(message_id);
    if (!(await this.isNotExist(edu_center_id, message_id))) {
      throw new BadRequestException('Edu Center Message already exists!');
    }
    const newEduCenterMessage = await this.eduCenterMessageRepository.create({
      id: await this.generateUniqueId(),
      ...createEduCenterMessageDto,
      body: message.body,
      is_active: true,
    });
    return this.getOne(newEduCenterMessage.id);
  }

  async findAll(edu_center_id: string) {
    if (!edu_center_id) {
      throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
    }
    await this.createForEduCenter(edu_center_id);
    return this.eduCenterMessageRepository.findAll({
      where: { edu_center_id },
      attributes: ['id', 'body', 'is_active', 'edu_center_id'],
      include: [
        {
          model: Message,
          attributes: ['id', 'title'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(
    id: string,
    updateEduCenterMessageDto: UpdateEduCenterMessageDto,
  ) {
    await this.getOne(id);
    await this.eduCenterMessageRepository.update(updateEduCenterMessageDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    const eduCenterMessage = await this.getOne(id);
    await this.eduCenterMessageRepository.destroy({ where: { id } });
    return eduCenterMessage;
  }

  async createForEduCenter(edu_center_id: string) {
    const allMessage = await this.messageService.findAll();
    for (let message of allMessage) {
      if (await this.isNotExist(edu_center_id, message.id)) {
        await this.eduCenterMessageRepository.create({
          id: await this.generateUniqueId(),
          body: message.body,
          is_active: true,
          edu_center_id,
          message_id: message.id,
        });
      }
    }
  }

  async getOne(id: string) {
    const eduCenterMessage = await this.eduCenterMessageRepository.findOne({
      where: { id },
      attributes: ['id', 'body', 'is_active'],
      include: [
        {
          model: Message,
          attributes: ['id', 'title'],
        },
      ],
    });
    if (!eduCenterMessage) {
      throw new HttpException(
        'Edu Center Message not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return eduCenterMessage;
  }

  async isNotExist(edu_center_id: string, message_id: string) {
    const eduCenterMessage = await this.eduCenterMessageRepository.findOne({
      where: { edu_center_id, message_id },
      attributes: ['id'],
    });
    return !eduCenterMessage ? true : false;
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
    const allUniqueId = await this.eduCenterMessageRepository.findAll({
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
