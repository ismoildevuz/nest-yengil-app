import { Module } from '@nestjs/common';
import { EduCenterModule } from './edu_center/edu_center.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { EduCenter } from './edu_center/models/edu_center.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { MessageModule } from './message/message.module';
import { Message } from './message/models/message.model';
import { EduCenterMessageModule } from './edu_center_message/edu_center_message.module';
import { EduCenterMessage } from './edu_center_message/models/edu_center_message.model';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/models/teacher.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      autoLoadModels: true,
      logging: false,
      models: [EduCenter, Message, EduCenterMessage, Teacher],
    }),
    EduCenterModule,
    MessageModule,
    EduCenterMessageModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
