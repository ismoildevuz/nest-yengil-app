import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Message } from '../../message/models/message.model';
import { EduCenterMessage } from '../../edu_center_message/models/edu_center_message.model';

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
  eduCenterMessage: EduCenterMessage;
}
