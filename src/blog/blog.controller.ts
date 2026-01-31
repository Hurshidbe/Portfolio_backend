import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

@ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 2 }], {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async createPost(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() dto: CreateBlogDto,
  ) {
    try {
      const photosResults = files.photos?.length
        ? await Promise.all(
            files.photos.map((file) =>
              this.cloudinaryService.uploadImage(file),
            ),
          )
        : [];
      dto.photos = photosResults.map((r) => r.secure_url);
      return await this.blogService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get()
  async All() {
    try {
      return await this.blogService.get();
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get(':id')
  async One(@Param('id') id: string) {
    try {
      return await this.blogService.getOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

@ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 3 }], {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async update(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Param('id') id: string,
    @Body() dto: UpdateBlogDto,
  ) {
    try {
      if (files?.photos?.length) {
        const photosResult = await Promise.all(
          files.photos.map((file) => this.cloudinaryService.uploadImage(file)),
        );
        dto.photos = photosResult.map((r) => r.secure_url);
      }
      const result = await this.blogService.update(id, dto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

@ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.blogService.remove(id);
    } catch (error) {
      throw new HttpException(error.messages, error.status ?? 500);
    }
  }
}
