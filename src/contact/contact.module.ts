import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './entities/contact.entity';
import { BotModule } from 'src/bot/bot.module';
import { BotService } from 'src/bot/bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    BotModule
  ],
  controllers: [ContactController],
  providers: [ContactService, BotService],
})
export class ContactModule {}
