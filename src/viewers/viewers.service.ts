import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Viewer, viewerSchema } from './entities/viewer.entity';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ViewersService {
  constructor(
    @InjectModel(Viewer.name) private readonly ViewersRepo: Model<Viewer>,
  ) {}

  async create(ip_address: string, device_info: string) {
    if ((await this.ViewersRepo.find({ ip_address })).length === 0)
      return await this.ViewersRepo.create({ ip_address, device_info });
  }

  async findAll() {
    return await this.ViewersRepo.find();
  }

  async viewCount() {
    return (await this.ViewersRepo.find()).length;
  }
}
