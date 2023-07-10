import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { EduCenter } from '../../edu_center/models/edu_center.model';
import { Group } from '../../group/models/group.model';
import { Student } from '../../student/models/student.model';

interface PaymentAttrs {
  id: string;
  price: number;
  note: string;
  status: string;
  for_month: string;
  date_payed: string;
  student_id: string;
  edu_center_id: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @Column({
    type: DataType.STRING,
  })
  for_month: string;

  @Column({
    type: DataType.DATE,
  })
  date_payed: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
  })
  student_id: string;

  @ForeignKey(() => EduCenter)
  @Column({
    type: DataType.STRING,
  })
  edu_center_id: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;
}
