import { Module, forwardRef } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { EduCenterModule } from '../edu_center/edu_center.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher]),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
