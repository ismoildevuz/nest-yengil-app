import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { EduCenterMessage } from '../../edu_center_message/models/edu_center_message.model';
import { Teacher } from '../../teacher/models/teacher.model';
import { Course } from '../../course/models/course.model';
import { Group } from '../../group/models/group.model';
import { Payment } from '../../payment/models/payment.model';

interface EduCenterAttrs {
  id: string;
  name: string;
  phone: string;
  hashed_password: string;
  image_name: string;
}

@Table({ tableName: 'edu_center' })
export class EduCenter extends Model<EduCenter, EduCenterAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  image_name: string;

  @HasMany(() => EduCenterMessage)
  eduCenterMessage: EduCenterMessage[];

  @HasMany(() => Teacher)
  teacher: Teacher[];

  @HasMany(() => Course)
  course: Course[];

  @HasMany(() => Group)
  group: Group[];

  @HasMany(() => Payment)
  payment: Payment[];
}
