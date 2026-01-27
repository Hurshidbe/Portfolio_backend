import { Controller, Get, Body, HttpException } from '@nestjs/common';
import { ViewersService } from './viewers.service';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}

  @Get()
  findAll() {
    try {
      return this.viewersService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get('view-count')
  async getViewCount() {
    try {
      return await this.viewersService.viewCount();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
