import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { EduCenterModule } from '../edu_center/edu_center.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
    forwardRef(() => GroupModule),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
