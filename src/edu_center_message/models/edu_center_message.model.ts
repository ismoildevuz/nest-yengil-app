import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EduCenter } from '../../edu_center/models/edu_center.model';
import { Message } from '../../message/models/message.model';

interface EduCenterMessageAttrs {
  id: string;
  body: string;
  is_active: boolean;
  edu_center_id: string;
  message_id: string;
}

@Table({ tableName: 'edu_center_message' })
export class EduCenterMessage extends Model<
  EduCenterMessage,
  EduCenterMessageAttrs
> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  body: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @ForeignKey(() => EduCenter)
  @Column({
    type: DataType.STRING,
  })
  edu_center_id: string;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.STRING,
  })
  message_id: string;

  @BelongsTo(() => EduCenter)
  eduCenter: EduCenter;

  @BelongsTo(() => Message)
  message: Message;
}
