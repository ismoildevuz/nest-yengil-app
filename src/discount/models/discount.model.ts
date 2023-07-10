import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EduCenter } from '../../edu_center/models/edu_center.model';
import { Group } from '../../group/models/group.model';
import { Student } from '../../student/models/student.model';

interface DiscountAttrs {
  id: string;
  price: number;
  group_id: string;
  student_id: string;
  edu_center_id: string;
}

@Table({ tableName: 'discount' })
export class Discount extends Model<Discount, DiscountAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.STRING,
  })
  group_id: string;

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

  @BelongsTo(() => Group)
  group: Group;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;
}
