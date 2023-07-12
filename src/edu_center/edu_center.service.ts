import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEduCenterDto } from './dto/create-edu_center.dto';
import { UpdateEduCenterDto } from './dto/update-edu_center.dto';
import { EduCenter } from './models/edu_center.model';
import { InjectModel } from '@nestjs/sequelize';
import { LoginEduCenterDto } from './dto/login-edu_center.dto';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { extname, join, resolve } from 'path';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { EduCenterMessageService } from '../edu_center_message/edu_center_message.service';
import { EduCenterMessage } from '../edu_center_message/models/edu_center_message.model';
import { Message } from '../message/models/message.model';

@Injectable()
export class EduCenterService {
  constructor(
    @InjectModel(EduCenter)
    private readonly eduCenterRepository: typeof EduCenter,
    private readonly eduCenterMessageService: EduCenterMessageService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginEduCenterDto: LoginEduCenterDto) {
    try {
      const { phone, password } = loginEduCenterDto;
      const eduCenterByPhone = await this.getEduCenterByPhone(phone);
      if (!eduCenterByPhone) {
        throw new UnauthorizedException('Phone or password is wrong');
      }
      const isMatchPass = await compare(
        password,
        eduCenterByPhone.hashed_password,
      );
      if (!isMatchPass) {
        throw new UnauthorizedException('Phone or password is wrong');
      }
      const token = await this.getToken(eduCenterByPhone);
      const eduCenter = await this.getOne(eduCenterByPhone.id);
      const response = {
        token,
        eduCenter,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createEduCenterDto: CreateEduCenterDto) {
    try {
      const eduCenterByPhone = await this.getEduCenterByPhone(
        createEduCenterDto.phone,
      );
      if (eduCenterByPhone) {
        throw new BadRequestException('Phone already registered!');
      }
      const hashed_password = await hash(createEduCenterDto.password, 7);
      const newEduCenter = await this.eduCenterRepository.create({
        id: await this.generateUniqueId(),
        ...createEduCenterDto,
        hashed_password,
      });
      await this.eduCenterMessageService.createForEduCenter(newEduCenter.id);
      return this.getOne(newEduCenter.id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return this.eduCenterRepository.findAll({
        attributes: ['id', 'name', 'phone', 'image_name'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      await this.eduCenterMessageService.createForEduCenter(id);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateEduCenterDto: UpdateEduCenterDto,
    image: Express.Multer.File,
  ) {
    try {
      const eduCenter = await this.getOne(id);
      if (updateEduCenterDto.phone) {
        const eduCenterByPhone = await this.getEduCenterByPhone(
          updateEduCenterDto.phone,
        );
        if (eduCenterByPhone && eduCenterByPhone.id != id) {
          throw new BadRequestException('Phone already registered!');
        }
      }
      if (updateEduCenterDto.password) {
        const hashed_password = await hash(updateEduCenterDto.password, 7);
        await this.eduCenterRepository.update(
          { hashed_password },
          { where: { id } },
        );
      }
      if (image) {
        await this.removeFile(eduCenter.image_name);
        const uploadedImage = await this.createFile(image);
        await this.eduCenterRepository.update(
          { image_name: uploadedImage },
          { where: { id } },
        );
      }
      await this.eduCenterRepository.update(updateEduCenterDto, {
        where: { id },
      });
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const eduCenter = await this.getOne(id);
      if (eduCenter.image_name) {
        await this.removeFile(eduCenter.image_name);
      }
      await this.eduCenterRepository.destroy({ where: { id } });
      return eduCenter;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeImage(id: string) {
    try {
      const eduCenter = await this.getOne(id);
      if (!eduCenter.image_name) {
        throw new HttpException(
          'Edu Center Image not found',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.eduCenterRepository.update(
        { image_name: null },
        { where: { id } },
      );
      await this.removeFile(eduCenter.image_name);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const eduCenter = await this.eduCenterRepository.findOne({
        where: { id },
        attributes: ['id', 'name', 'phone', 'image_name'],
        include: [
          {
            model: EduCenterMessage,
            attributes: ['id', 'body', 'is_active'],
            include: [
              {
                model: Message,
                attributes: ['id', 'title'],
              },
            ],
          },
        ],
      });
      if (!eduCenter) {
        throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
      }
      return eduCenter;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEduCenterByPhone(phone: string) {
    try {
      const eduCenter = await this.eduCenterRepository.findOne({
        where: { phone },
        attributes: ['id', 'name', 'phone', 'image_name', 'hashed_password'],
      });
      return eduCenter;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getToken(eduCenter: EduCenter) {
    try {
      const jwtPayload = {
        id: eduCenter.id,
        login: eduCenter.phone,
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
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
      const allUniqueId = await this.eduCenterRepository.findAll({
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

  async generateUniqueFileName(extName: string) {
    try {
      const allUniqueFileName = await this.eduCenterRepository.findAll({
        attributes: ['image_name'],
      });
      let fileName: any;
      while (true) {
        fileName = (await this.generateId()) + extName;
        if (!allUniqueFileName.includes(fileName)) {
          break;
        }
      }
      return fileName;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createFile(image: Express.Multer.File) {
    try {
      const fileName = await this.generateUniqueFileName(
        extname(image.originalname),
      );
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), image.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Error with uploading images',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string) {
    try {
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      rmSync(join(filePath, fileName));
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Error with deleting images',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
