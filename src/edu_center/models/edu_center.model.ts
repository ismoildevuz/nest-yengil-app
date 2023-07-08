import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
