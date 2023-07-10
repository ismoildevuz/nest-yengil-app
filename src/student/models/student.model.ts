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

interface StudentAttrs {
  id: string;
  full_name: string;
  phone: string;
  note: string;
  status: string;
  group_id: string;
  edu_center_id: string;
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.STRING,
  })
  group_id: string;

  @ForeignKey(() => EduCenter)
  @Column({
    type: DataType.STRING,
  })
  edu_center_id: string;

  @BelongsTo(() => Group)
  group: Group;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;
}
