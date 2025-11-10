import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { CreateMainpageDto } from './dto/create-mainpage.dto';
import { UpdateMainpageDto } from './dto/update-mainpage.dto';

@Controller('mainpage')
export class MainpageController {
  constructor(private readonly mainpageService: MainpageService) {}

  @Post()
  create(@Body() createMainpageDto: CreateMainpageDto) {
    return this.mainpageService.create(createMainpageDto);
  }

  @Get()
  findAll() {
    return this.mainpageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainpageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainpageDto: UpdateMainpageDto) {
    return this.mainpageService.update(+id, updateMainpageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainpageService.remove(+id);
  }
}
