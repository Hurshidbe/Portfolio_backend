import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Viewer, viewerSchema } from './entities/viewer.entity';
import { Model } from 'mongoose';
import { MessageSender } from 'src/bot/bot.messagecreator';

@Injectable()
export class ViewersService {
  constructor(
    @InjectModel(Viewer.name) private readonly ViewersRepo: Model<Viewer>,
    private messageSender : MessageSender
  ) {}

  async create(ip_address: string, device_info: string) {
    if ((await this.ViewersRepo.find({ ip_address })).length === 0){
      await this.messageSender.sendViewer(ip_address, device_info)
      return await this.ViewersRepo.create({ ip_address, device_info })
    }
  }

  async findAll() {
    return await this.ViewersRepo.find().sort({createdAt : -1});
  }

  async viewCount() {
    return (await this.ViewersRepo.find()).length;
  }
}
