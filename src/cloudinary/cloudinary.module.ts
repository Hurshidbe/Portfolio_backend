import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Experience,
  ExperienceSchema,
} from 'src/experience/entities/experience.entity';
import { Project, ProjectSchema } from 'src/projects/entities/project.entity';
import { Blog, BlogSchema } from '../blog/entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
