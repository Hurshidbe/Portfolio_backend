import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Achievement } from './entities/achievement.entity';
import { Model } from 'mongoose';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private readonly achievementRepo : Model<Achievement>
  ){}

  async create(createAchievementDto: CreateAchievementDto) {
    return await this.achievementRepo.create(createAchievementDto);
  }

  async findAll() {
    return await this.achievementRepo.find().sort({createdAt : -1});
  }

  async findOne(id: string) {
    const data = await this.achievementRepo.findById(id);
    if(!data) throw new NotFoundException('data not found bu this id')
      return data
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto) {
    const updated= await this.achievementRepo.findByIdAndUpdate(id, updateAchievementDto, {new : true});
    if(!updated) throw new NotFoundException('certificate not found')
      return updated
  }

  async remove(id: string) {
    const deleting = await this.achievementRepo.findByIdAndDelete(id)
    if(!deleting) throw new NotFoundException('sertificate not found')
      return deleting
  }
}
