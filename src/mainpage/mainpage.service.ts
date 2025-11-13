import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-mainpage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Main } from './entities/mainpage.entity';
import { Model } from 'mongoose';

@Injectable()
export class MainpageService {
  constructor(
    @InjectModel(Main.name) private readonly MainRepo : Model<Main>
  ){}

  async create(data : CreateProfileDto){
    return await this.MainRepo.create(data)
  }

  async normalizeArrayFields(dto: any, fields: string[]) {
  for (const field of fields) {
    const value = dto[field] as any;
    if (typeof value === 'string') {
      dto[field] = value
        .split(',')
        .map((item: string) => item.trim())
        .filter(Boolean);
    }
  }
}

}
