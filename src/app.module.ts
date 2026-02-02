import { Module } from '@nestjs/common';
import { MainpageModule } from './mainpage/mainpage.module';
import { BlogModule } from './blog/blog.module';
import { ViewersModule } from './viewers/viewers.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactModule } from './contact/contact.module';
import { BotModule } from './bot/bot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ExperienceModule } from './experience/experience.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/AuthGuard';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: {
        expiresIn: '24h',
      }
    }),
    MongooseModule.forRoot(process.env.DB || ''),
    AuthModule,
    MainpageModule,
    ExperienceModule,
    ProjectsModule,
    BlogModule,
    ContactModule,
    ViewersModule,
    BotModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
