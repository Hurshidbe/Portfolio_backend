import { Module } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { MainpageController } from './mainpage.controller';

@Module({
  controllers: [MainpageController],
  providers: [MainpageService],
})
export class MainpageModule {}
