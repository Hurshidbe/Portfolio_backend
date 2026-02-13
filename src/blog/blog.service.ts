import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import type { Cache } from 'cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogRepo: Model<Blog>,
    @Inject(CACHE_MANAGER) private cacheManager : Cache
  ) {}

  async create(dto: CreateBlogDto) {
    return await this.blogRepo.create(dto);
  }
  async update(id: string, dto: UpdateBlogDto) {
    const post = await this.blogRepo.findById(id);
    if (!post) throw new BadRequestException('post not found');
    return await this.blogRepo.findByIdAndUpdate(id, dto, { new: true });
  }

  async addView(id : string, ip : string){
    const isWatchedBefore = await this.cacheManager.get(`${id}${ip}`)
    if(!isWatchedBefore){
      await this.cacheManager.set(`${id}${ip}`, Date.now(),864000)
      return await this.blogRepo.findByIdAndUpdate(id, {$inc:{views: +1}}, {new : true})}
      else return
  }

  async get() {
    return await this.blogRepo.find().sort({createdAt : -1});
  }

  async getOne(id: string) {
    return await this.blogRepo.findById(id);
  }

  async remove(id: string) {
    const deleting = await this.blogRepo.findById(id);
    if (!deleting) throw new NotFoundException('data not found by this id');
    return this.blogRepo.deleteOne({ _id: id });
  }
}
