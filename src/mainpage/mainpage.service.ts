import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-mainpage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Main } from './entities/mainpage.entity';
import { Model } from 'mongoose';
import { UpdateProfileDto } from './dto/update-mainpage.dto';

@Injectable()
export class MainpageService {
  constructor(@InjectModel(Main.name) private readonly MainRepo: Model<Main>) {}

  async find() {
    return await this.MainRepo.find();
  }

  async create(data: CreateProfileDto) {
    if ((await this.MainRepo.find()).length >= 1)
      throw new BadRequestException('you can not create new data. only update');
    return await this.MainRepo.create(data);
  }

  async updateById(id: string, UpdateProfileDto: UpdateProfileDto) {
    const profile = this.MainRepo.find({ _id: id });
    if (!profile) throw new NotFoundException('Profile not found');
    return await this.MainRepo.findByIdAndUpdate(id, UpdateProfileDto, {
      new: true,
    });
  }

  normalizeArrayFields(dto: any, fields: string[]) {
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
