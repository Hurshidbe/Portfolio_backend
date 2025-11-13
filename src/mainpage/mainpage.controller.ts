import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { CreateProfileDto } from './dto/create-mainpage.dto';
import { Http2ServerResponse } from 'http2';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { bold } from 'telegraf/format';

@Controller('mainpage')
export class MainpageController {
  constructor(
    private readonly mainpageService: MainpageService,
    private readonly cloudinaryService : CloudinaryService
  ) {}


@Post()
@UseInterceptors(
  FileFieldsInterceptor(
    [
      { name: 'photos', maxCount: 3 },
      { name: 'cv', maxCount: 1 },
    ],
    { limits: { fileSize: 5 * 1024 * 1024 } }
  )
)
async create(
  @UploadedFiles() files: { photos?: Express.Multer.File[]; cv?: Express.Multer.File[] },
  @Body() createMainpageDto: CreateProfileDto
) {
  try {
    await this.mainpageService.normalizeArrayFields(createMainpageDto, ['skills', 'tools']);

    const photosUrls = files.photos?.length
      ? await Promise.all(files.photos.map(file => this.cloudinaryService.uploadToCloud(file)))
      : [];
    const cvUrls = files.cv?.length
      ? await Promise.all(files.cv.map(file => this.cloudinaryService.uploadToCloud(file)))
      : [];

    createMainpageDto.photos = photosUrls.map(r => r.secure_url);
    createMainpageDto.cv = cvUrls.length ? cvUrls[0].secure_url : undefined;

    return await this.mainpageService.create(createMainpageDto);
  } catch (error) {
    throw new HttpException(error.message || 'Server error', error.status || 500);
  }
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainpageDto: CreateProfileDto) {
  }
}
