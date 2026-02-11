import { Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";

@Update()
export class BotService {
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(
      'Bolimni tanlang:',
      Markup.keyboard([
        ['Xizmatlar', 'Biz haqimizda'],
        ['Aloqa'],
      ])
      .resize()
      .oneTime()
    );
  }
}
