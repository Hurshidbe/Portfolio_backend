import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { CreateProfileDto } from './dto/create-mainpage.dto';
import { Http2ServerResponse } from 'http2';

@Controller('mainpage')
export class MainpageController {
  constructor(private readonly mainpageService: MainpageService) {}

  @Post()
  async create(@Body() createMainpageDto: CreateProfileDto) {
    try {
      return await this.mainpageService.create(createMainpageDto)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainpageDto: CreateProfileDto) {
  }
}
