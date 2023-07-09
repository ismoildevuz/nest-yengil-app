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

@Injectable()
export class EduCenterService {
  constructor(
    @InjectModel(EduCenter)
    private readonly eduCenterRepository: typeof EduCenter,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginEduCenterDto: LoginEduCenterDto) {
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
  }

  async create(createEduCenterDto: CreateEduCenterDto) {
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
    return this.getOne(newEduCenter.id);
  }

  async findAll() {
    return this.eduCenterRepository.findAll({
      attributes: ['id', 'name', 'phone', 'image_name'],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(
    id: string,
    updateEduCenterDto: UpdateEduCenterDto,
    image: Express.Multer.File,
  ) {
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
  }

  async remove(id: string) {
    const eduCenter = await this.getOne(id);
    if (eduCenter.image_name) {
      await this.removeFile(eduCenter.image_name);
    }
    await this.eduCenterRepository.destroy({ where: { id } });
    return eduCenter;
  }

  async removeImage(id: string) {
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
  }

  async getOne(id: string) {
    const eduCenter = await this.eduCenterRepository.findOne({
      where: { id },
      attributes: ['id', 'name', 'phone', 'image_name'],
    });
    if (!eduCenter) {
      throw new HttpException('Edu Center not found', HttpStatus.NOT_FOUND);
    }
    return eduCenter;
  }

  async getEduCenterByPhone(phone: string) {
    const eduCenter = await this.eduCenterRepository.findOne({
      where: { phone },
      attributes: ['id', 'name', 'phone', 'image_name', 'hashed_password'],
    });
    return eduCenter;
  }

  async getToken(eduCenter: EduCenter) {
    const jwtPayload = {
      id: eduCenter.id,
      login: eduCenter.phone,
    };
    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.TOKEN_KEY,
      expiresIn: process.env.TOKEN_TIME,
    });
    return token;
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
  }

  async generateUniqueFileName(extName: string) {
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
      return 'Error with deleting images';
      // throw new HttpException(
      //   'Error with deleting images',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }
}
