import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectsRepo: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepo.create(createProjectDto);
  }

  async findAll() {
    return await this.projectsRepo.find().sort({createdAt : -1});
  }

  async findOne(id: string) {
    const data = await this.projectsRepo.findById(id);
    if (!data) throw new NotFoundException('projects not found');
    return data;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const data = await this.projectsRepo.findById(id);
    if (!data) throw new NotFoundException('projects not found');
    return await this.projectsRepo.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const data = await this.projectsRepo.findById(id);
    if (!data) throw new NotFoundException('projects not found');
    return await this.projectsRepo.findByIdAndDelete(id);
  }

  async normalizeArrayFields(dto: any, fields: string[]) {
    for (const field of fields) {
      const value = dto[field];
      if (typeof value === 'string') {
        dto[field] = value
          .split(',')
          .map((item: string) => item.trim())
          .filter(Boolean);
      }
    }
  }
}
