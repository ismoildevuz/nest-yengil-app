import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { EduCenterModule } from '../edu_center/edu_center.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Course]),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
