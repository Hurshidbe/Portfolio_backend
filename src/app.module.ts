import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainpageModule } from './mainpage/mainpage.module';
import { BlogModule } from './blog/blog.module';
import { ViewersModule } from './viewers/viewers.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactModule } from './contact/contact.module';
import { BotModule } from './bot/bot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB || ""),
    MainpageModule, BlogModule, ViewersModule, ProjectsModule, ContactModule, BotModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
