import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ViewersService } from './viewers.service';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}

  @Get()
  findAll() {
    return this.viewersService.findAll();
  }

  @Get('view-count')
  async getViewCount(){
    try {
      return await this.viewersService.viewCount()
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
