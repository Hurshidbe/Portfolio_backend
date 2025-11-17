import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {name : 'photos' , maxCount : 3}
      ],
      {limits : {fileSize : 5*1024*1024}}
    )
  )
  async create(
    @UploadedFiles() files : {photos? :Express.Multer.File[]},
    @Body() createProjectDto: CreateProjectDto
  ) {
      try {
        await this.projectsService.normalizeArrayFields(createProjectDto, ['tecnologies']);
        const photosResults = files.photos?.length
        ? await Promise.all(files.photos.map(file => this.cloudinaryService.uploadImage(file))):[]
        createProjectDto.photos = photosResults.map(r=>r.secure_url)

        return await this.projectsService.create(createProjectDto||500)
      } catch (error) {
        
      }
  }

  @Get()
  findAll() {
    try {
      return this.projectsService.findAll();
    } catch (error) {
      throw new HttpException(error.message , error.status||500)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
     try {
      return this.projectsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message , error.status||500)
    }
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor(
    [
      {name : 'photos' , maxCount : 3}
    ]
  ))
  async update(
    @UploadedFiles() files : {photos? : Express.Multer.File[]},
    @Param('id') id: string, 
    @Body() updateProjectDto: UpdateProjectDto) {

    try {
      await this.projectsService.normalizeArrayFields(updateProjectDto, ['tecnologies']);
      const photosResults = files.photos?.length
      ? await Promise.all(files.photos.map(file => this.cloudinaryService.uploadImage(file)))
      : [];
    if (photosResults.length) {
      updateProjectDto.photos = photosResults.map(r => r.secure_url);
    }

    return this.projectsService.update(id, updateProjectDto);
    } catch (error) {
      throw new HttpException(error.message , error.status||500)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.projectsService.remove(id); 
    } catch (error) {
      throw new HttpException(error.message , error.status||500)
    }
  }
}
