import { Injectable } from '@nestjs/common';
import { CreateMainpageDto } from './dto/create-mainpage.dto';
import { UpdateMainpageDto } from './dto/update-mainpage.dto';

@Injectable()
export class MainpageService {
  create(createMainpageDto: CreateMainpageDto) {
    return 'This action adds a new mainpage';
  }

  findAll() {
    return `This action returns all mainpage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mainpage`;
  }

  update(id: number, updateMainpageDto: UpdateMainpageDto) {
    return `This action updates a #${id} mainpage`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainpage`;
  }
}
