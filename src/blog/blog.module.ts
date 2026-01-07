import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    CloudinaryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
