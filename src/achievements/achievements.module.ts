import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Achievement, AchievementSchema } from './entities/achievement.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Achievement.name, schema : AchievementSchema}
    ]),
    CloudinaryModule
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
