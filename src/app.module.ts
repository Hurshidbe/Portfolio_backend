import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainpageModule } from './mainpage/mainpage.module';
import { BlogModule } from './blog/blog.module';
import { ViewersModule } from './viewers/viewers.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactModule } from './contact/contact.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [MainpageModule, BlogModule, ViewersModule, ProjectsModule, ContactModule, BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
