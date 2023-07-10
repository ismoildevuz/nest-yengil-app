import { Module, forwardRef } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from './models/discount.model';
import { GroupModule } from '../group/group.module';
import { StudentModule } from '../student/student.module';
import { EduCenterModule } from '../edu_center/edu_center.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Discount]),
    forwardRef(() => GroupModule),
    forwardRef(() => StudentModule),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
