import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Http2ServerRequest } from 'http2';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async createPost(@Body() dto: CreateBlogDto) {
    try {
      return await this.blogService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get()
  async All() {
    try {
      return await this.blogService.get();
    } catch (error) {
      throw new HttpException(error.message , error.status || 500)
    }
  }

  @Get(':id')
  async One(@Param('id') id: string) {
    try {
      return await this.blogService.getOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    try {
      return await this.blogService.update(id, dto);
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
