import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageRepository: typeof Message,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const newMessage = await this.messageRepository.create({
        id: await this.generateUniqueId(),
        ...createMessageDto,
      });
      return this.getOne(newMessage.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return this.messageRepository.findAll({
        attributes: ['id', 'title', 'body'],
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

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    try {
      await this.getOne(id);
      await this.messageRepository.update(updateMessageDto, { where: { id } });
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const message = await this.getOne(id);
      await this.messageRepository.destroy({ where: { id } });
      return message;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const message = await this.messageRepository.findOne({
        where: { id },
        attributes: ['id', 'title', 'body'],
      });
      if (!message) {
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      }
      return message;
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
      const allUniqueId = await this.messageRepository.findAll({
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
