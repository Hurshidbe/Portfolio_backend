import { Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";

@Update()
export class BotService {
  @Start()
  async startCommand(ctx: Context) {
    if (ctx.from?.username === 'Hursheed') {
      await ctx.reply('Assalomu alaykum Xurshidbek, admin tasdiqlandi');
    } else {
      await ctx.reply('Ushbu bot siz uchun ishlamaydi');
    }
  }
}

