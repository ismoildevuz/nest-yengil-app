import { Module, forwardRef } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { EduCenterModule } from '../edu_center/edu_center.module';
import { CourseModule } from '../course/course.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Group]),
    forwardRef(() => CourseModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
