import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Viewer, viewerSchema } from './entities/viewer.entity';
import { BotModule } from 'src/bot/bot.module';
import { BotService } from 'src/bot/bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Viewer.name, schema: viewerSchema }]),
    BotModule
  ],
  controllers: [ViewersController],
  providers: [ViewersService, BotService],
  exports: [ViewersService],
})
export class ViewersModule {}
