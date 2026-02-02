import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({summary : 'project qo`shish'})
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateProjectDto })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 3 }], {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    try {
      const photosResults = files.photos?.length
        ? await Promise.all(
            files.photos.map((file) =>
              this.cloudinaryService.uploadImage(file),
            ),
          )
        : [];
      createProjectDto.photos = photosResults.map((r) => r.secure_url);
      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get()
  @ApiOperation({summary: 'barcha projectlarni ko`rish'})
  findAll() {
    try {
      return this.projectsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  @ApiOperation({summary : 'projectni Idsi bilan det qilish'})
  async findOne(@Param('id') id: string) {
    try {
      return await this.projectsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateProjectDto })
  @ApiOperation({summary : 'projectni malumotlarini id orqali taxrirlash'})
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 3 }]))
  async update(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
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
        updateProjectDto.photos = photosResults.map((r) => r.secure_url);
      }

      return this.projectsService.update(id, updateProjectDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary : 'projectni id orqali o`chirish'})
  remove(@Param('id') id: string) {
    try {
      return this.projectsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
