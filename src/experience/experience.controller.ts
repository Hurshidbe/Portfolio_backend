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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary : 'yangi jajriba qo`shish'})
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    try {
      return await this.experienceService.create(createExperienceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @Get()
  @ApiOperation({summary : 'barcha tajribalarni ko`rish'})
  async findAll() {
    try {
      return await this.experienceService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @Get(':id')
  @ApiOperation({summary : 'tajriba ma`lumotini Id bo"yicha olish'})
  async findOne(@Param('id') id: string) {
    try {
      return await this.experienceService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary : 'tajriba malumotini Id bo`yicha taxririlash'})
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      return await this.experienceService.update(id, updateExperienceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary : 'tajribani Id si orqali delete qilish'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.experienceService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }
}
