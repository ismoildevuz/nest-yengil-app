import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { EduCenterModule } from '../edu_center/edu_center.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    forwardRef(() => StudentModule),
    forwardRef(() => EduCenterModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
