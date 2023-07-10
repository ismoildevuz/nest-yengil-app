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
import { EduCenterMessage } from '../../edu_center_message/models/edu_center_message.model';

interface MessageAttrs {
  id: string;
  title: string;
  body: string;
}

@Table({ tableName: 'message' })
export class Message extends Model<Message, MessageAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  body: string;

  @HasMany(() => EduCenterMessage)
  eduCenterMessage: EduCenterMessage[];
}
