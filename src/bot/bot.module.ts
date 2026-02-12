import { Logger, Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as dotenv from 'dotenv'
import { MessageSender } from './bot.messagecreator';
dotenv.config()

@Module({
  imports : [
   TelegrafModule.forRootAsync({
  useFactory: () => {
    const token = process.env.BOT_TOKEN;
    if (!token) throw new Error('BOT_TOKEN topilmadi!');
    Logger.log('https://t.me/Portification_bot working successfully!!!')
    return {token: token};
  },
})
  ],
  providers: [BotService, MessageSender],
  exports : [BotService, MessageSender]
})
export class BotModule {}
