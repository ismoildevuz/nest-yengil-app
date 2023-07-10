import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEduCenterMessageDto } from './dto/create-edu_center_message.dto';
import { UpdateEduCenterMessageDto } from './dto/update-edu_center_message.dto';
import { EduCenterMessage } from './models/edu_center_message.model';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../message/models/message.model';
import { MessageService } from '../message/message.service';

@Injectable()
export class EduCenterMessageService {
  constructor(
    @InjectModel(EduCenterMessage)
    private readonly eduCenterMessageRepository: typeof EduCenterMessage,
    private readonly messageService: MessageService,
  ) {}

  async create(createEduCenterMessageDto: CreateEduCenterMessageDto) {
    const newEduCenterMessage = await this.eduCenterMessageRepository.create({
      id: await this.generateUniqueId(),
      ...createEduCenterMessageDto,
      is_active: true,
    });
    return this.getOne(newEduCenterMessage.id);
  }

  async findAll() {
    return this.eduCenterMessageRepository.findAll({
      attributes: ['id', 'body', 'is_active'],
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
      await this.eduCenterMessageRepository.create({
        id: await this.generateUniqueId(),
        body: message.body,
        is_active: true,
        edu_center_id,
        message_id: message.id,
      });
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
