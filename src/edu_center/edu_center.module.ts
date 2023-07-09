import { Module } from '@nestjs/common';
import { EduCenterService } from './edu_center.service';
import { EduCenterController } from './edu_center.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EduCenter } from './models/edu_center.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([EduCenter]), JwtModule],
  controllers: [EduCenterController],
  providers: [EduCenterService],
  exports: [EduCenterService],
})
export class EduCenterModule {}
