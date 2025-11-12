import { Module } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { MainpageController } from './mainpage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Main, MainSchema } from './entities/mainpage.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      {schema : MainSchema , name : Main.name}
    ])
  ],
  controllers: [MainpageController],
  providers: [MainpageService],
})
export class MainpageModule {}
