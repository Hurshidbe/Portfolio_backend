import { Module } from '@nestjs/common';
import { MainpageService } from './mainpage.service';
import { MainpageController } from './mainpage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Main, MainSchema } from './entities/mainpage.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {schema : MainSchema , name : Main.name}
    ]),
    CloudinaryModule
  ],
  controllers: [MainpageController],
  providers: [MainpageService],
})
export class MainpageModule {}
