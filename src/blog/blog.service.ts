import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blogRepo: Model<Blog>) {}

  async create(dto: CreateBlogDto) {
    return await this.blogRepo.create(dto);
  }
  async update(id: string, dto: UpdateBlogDto) {
    const post = await this.blogRepo.findById(id);
    if (!post) throw new BadRequestException('post not found');
    return await this.blogRepo.findByIdAndUpdate(id, dto, { new: true });
  }

  async get() {
    return await this.blogRepo.find();
  }

  async getOne(id: string) {
    return await this.blogRepo.findById(id);
  }

  async remove(id: string) {
    return await this.blogRepo.deleteOne({ id });
  }
}
