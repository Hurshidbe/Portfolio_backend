import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    try {
      return await this.experienceService.create(createExperienceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.experienceService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.experienceService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      return await this.experienceService.update(id, updateExperienceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.experienceService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }
}
