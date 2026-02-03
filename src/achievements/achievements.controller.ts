import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import e from 'express';

@Controller('achievements')
export class AchievementsController {
  constructor(
    private readonly achievementsService: AchievementsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth(`JWT-auth`)
  @ApiConsumes(`multipart/form-data`)
  @ApiBody({type : CreateAchievementDto})
  @ApiOperation({summary : `sertifikat qo'shish`})
  @UseInterceptors(
    FileFieldsInterceptor(
      [{name: 'photos', maxCount : 1}],
      {limits : {fileSize : 5*1024*1024}}
    )
  )
  async create(
    @UploadedFiles()
    files : {photos? : Express.Multer.File[]},
    @Body() createAchievementDto: CreateAchievementDto
  ) {
    try {
      if (files && files.photos && files.photos.length > 0) {
        const file = Array.isArray(files.photos) ? files.photos[0] : files.photos;
        const result = await this.cloudinaryService.uploadImage(file);
        createAchievementDto.photos = result.secure_url;
      }
      return await this.achievementsService.create(createAchievementDto);
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message , error.status??500)
    }
  }

  @Get()
  @ApiOperation({summary:`barcha sertifikatlarni ko'rish`})
  async findAll() {
    try {
    return this.achievementsService.findAll();
    } catch (error) {
      throw new HttpException(error.message , error.status??500)
    }
  }

  @Get(':id')
  @ApiOperation({summary:`bitta sertifikatni ko'rish`})
  async findOne(@Param('id') id: string) {
    try {
    return this.achievementsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message , error.status??500)
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth(`JWT-auth`)
  @ApiConsumes('multipart/form-data')
  @ApiBody({type : UpdateAchievementDto})
  @ApiOperation({summary :`postni idsi bilan update qilish`})
  @UseInterceptors(
    FileFieldsInterceptor(
      [{name: 'photos', maxCount : 1}],
      {limits : {fileSize : 5*1024*1024}}
    )
  )
  async update(
  @Param('id') id: string,
  @UploadedFiles() files: { photos?: Express.Multer.File[] },
  @Body() dto: UpdateAchievementDto
) {
  if (files?.photos?.length) {
    const file = files.photos[0];           
    const result = await this.cloudinaryService.uploadImage(file);
    if (result?.secure_url) dto.photos = result.secure_url;
  }
  return await this.achievementsService.update(id, dto);
}

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth(`JWT-auth`)
  @ApiOperation({summary:`postni id si orqali delete qilish`})
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
}
