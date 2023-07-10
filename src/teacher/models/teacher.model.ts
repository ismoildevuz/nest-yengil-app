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

interface TeacherAttrs {
  id: string;
  full_name: string;
  phone: string;
  salary: number;
  telegram: string;
  note: string;
  edu_center_id: string;
}

@Table({ tableName: 'teacher' })
export class Teacher extends Model<Teacher, TeacherAttrs> {
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
    type: DataType.SMALLINT,
  })
  salary: number;

  @Column({
    type: DataType.STRING,
  })
  telegram: string;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @ForeignKey(() => EduCenter)
  @Column({
    type: DataType.STRING,
  })
  edu_center_id: string;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;
}
