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
import { Teacher } from '../../teacher/models/teacher.model';
import { Course } from '../../course/models/course.model';
import { Discount } from '../../discount/models/discount.model';

interface GroupAttrs {
  id: string;
  name: string;
  price: number;
  lesson_day: string;
  lesson_time: string;
  note: string;
  date_start: string;
  course_id: string;
  teacher_id: string;
  edu_center_id: string;
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupAttrs> {
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
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  lesson_day: string;

  @Column({
    type: DataType.TIME,
  })
  lesson_time: string;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @Column({
    type: DataType.DATEONLY,
  })
  date_start: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING,
  })
  course_id: string;

  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.STRING,
  })
  teacher_id: string;

  @ForeignKey(() => EduCenter)
  @Column({
    type: DataType.STRING,
  })
  edu_center_id: string;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;

  @HasMany(() => Discount)
  discount: Discount[];
}
