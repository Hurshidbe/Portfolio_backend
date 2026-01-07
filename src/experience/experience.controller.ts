import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    return await this.experienceService.create(createExperienceDto);
  }

  @Get()
  async findAll() {
    try {
      return await this.experienceService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.experienceService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      return await this.experienceService.update(id, updateExperienceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.experienceService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
