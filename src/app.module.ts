import { Module } from '@nestjs/common';
import { EduCenterModule } from './edu_center/edu_center.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { EduCenter } from './edu_center/models/edu_center.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

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
      models: [EduCenter],
    }),
    EduCenterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
