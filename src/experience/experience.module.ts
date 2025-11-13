import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience } from './entities/experience.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Experience.name, schema : Experience}
    ])
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
