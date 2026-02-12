import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  UseInterceptors,
  UploadedFiles,
  Res,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MainpageService } from './mainpage.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fs from 'fs';
import * as path from 'path';
import type { Request } from 'express';
import { ViewersService } from 'src/viewers/viewers.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-mainpage.dto';
import { UpdateProfileDto } from './dto/update-mainpage.dto';

@Controller('mainpage')
export class MainpageController {
  constructor(
    private readonly mainpageService: MainpageService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly viewerService: ViewersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProfileDto })
  @ApiOperation({summary : 'main page uchun data yaratish. (faqat bitta yaratiladi)'})
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
      ],
      { limits: { fileSize: 5 * 1024 * 1024 } },
    ),
  )
  async create(
    @UploadedFiles()
    files: { photos?: Express.Multer.File[]; cv?: Express.Multer.File[] },
    @Body() createMainpageDto: CreateProfileDto,
  ) {
    try {
      const photosResults = files.photos?.length
        ? await Promise.all(
            files.photos.map((file) =>
              this.cloudinaryService.uploadImage(file),
            ),
          )
        : [];
      createMainpageDto.photos = photosResults.map((r) => r.secure_url);

      if (files.cv && files.cv.length) {
        const cvFile = files.cv[0];
        const cvFolder = path.join(__dirname, '../../uploads/cv');

        if (!fs.existsSync(cvFolder))
          fs.mkdirSync(cvFolder, { recursive: true });

        const oldFiles = fs.readdirSync(cvFolder);
        for (const f of oldFiles) fs.unlinkSync(path.join(cvFolder, f));

        const filename = `hurshidbe_${cvFile.originalname}`;
        const filepath = path.join(cvFolder, filename);
        fs.writeFileSync(filepath, cvFile.buffer);

        createMainpageDto.cv = `/uploads/cv/${filename}`;
      }
      return await this.mainpageService.create(createMainpageDto);
    } catch (error: any) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({summary : 'main pagedagi datani taxrirlash'})
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({type : UpdateProfileDto})
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
      ],
      { limits: { fileSize: 5 * 1024 * 1024 } },
    ),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles()
    files: { photos?: Express.Multer.File[]; cv?: Express.Multer.File[] },
    @Body() updateMainpageDto : UpdateProfileDto,
  ) {
    try {
      const photosResults = files.photos?.length
        ? await Promise.all(
            files.photos.map((file) =>
              this.cloudinaryService.uploadImage(file),
            ),
          )
        : [];
      if (photosResults.length) {
        updateMainpageDto.photos = photosResults.map((r) => r.secure_url);
      }
      if (files.cv && files.cv.length) {
        const cvFile = files.cv[0];
        const cvFolder = path.join(__dirname, '../../uploads/cv');

        if (!fs.existsSync(cvFolder))
          fs.mkdirSync(cvFolder, { recursive: true });
        const oldFiles = fs.readdirSync(cvFolder);
        for (const f of oldFiles) fs.unlinkSync(path.join(cvFolder, f))
        const filename = `hurshidbe_${cvFile.originalname}`;
        const filepath = path.join(cvFolder, filename);
        fs.writeFileSync(filepath, cvFile.buffer);
        updateMainpageDto.cv = `/uploads/cv/${filename}`;
      }
      return await this.mainpageService.updateById(id, updateMainpageDto);
    } catch (error: any) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get('cv')
  @ApiOperation({summary : 'cv faylni yuklab olish'})
  async downloadCv(@Res() res: any) {
    try {
      const cvFolder = path.join(__dirname, '../../uploads/cv');
      const files = fs.readdirSync(cvFolder);
      if (!files.length) throw new HttpException('CV not found', 404);

      const filepath = path.join(cvFolder, files[0]);
      res.download(filepath, files[0]);
    } catch (error: any) {
      throw new HttpException(error.message, error.status ??500);
    }
  }

  @Get()
  @ApiOperation({summary : 'main page ma`lumotlarini olish'})
  async getMainPage(@Req() req: Request) {
    try {
      await this.viewerService.create(
        req.ip || '',
        req.headers['user-agent'] || '',
      );
      console.log(req.ip)
      return await this.mainpageService.find();
    } catch (error) {
      throw new HttpException(error.message, error.status ??500);
    }
  }
}
