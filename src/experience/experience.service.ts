import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Experience } from './entities/experience.entity';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceRepo: Model<Experience>,
  ) {}
  async create(createExperienceDto: CreateExperienceDto) {
    return await this.experienceRepo.create(createExperienceDto);
  }

  async findAll() {
    return await this.experienceRepo.find();
  }

  async findOne(id: string) {
    const data = await this.experienceRepo.findById(id);
    if (!data) throw new NotFoundException('data not found by this Id');
    return data;
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const updated = await this.experienceRepo.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('data not found by this Id');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.experienceRepo.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('data not found by this Id');
    return deleted;
  }
}
