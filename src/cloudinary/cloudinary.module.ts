import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from 'src/experience/entities/experience.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Experience.name , schema : ExperienceSchema}
    ])
  ],
  providers: [CloudinaryService],
  exports : [CloudinaryService]
})
export class CloudinaryModule {}
