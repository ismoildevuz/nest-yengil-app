import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message.model';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
