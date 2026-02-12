import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import * as dotenv from 'dotenv'
import { userInfo } from "os";
dotenv.config()
@Injectable()
export class MessageSender {
    private readonly userId: number = Number(process.env.ADMIN_TG_ID ?? 555);
    constructor(
        @InjectBot() private readonly bot : Telegraf<Context>
    ){}
    async sendContact(name : string, phone_tg : string, theme : string, text : string){
        const full_text = `
<b>📩 Yangi xabar keldi!</b>
<b>👤 Kimdan:</b> ${name}
<b>📞 Aloqa:</b> ${phone_tg}
<b>📌 Mavzu:</b> ${theme}
<b>📝 Xabar matni:</b>
<i>${text}</i>`
    await this.bot.telegram.sendMessage(this.userId, full_text, {parse_mode : 'HTML'})
    }

    async sendViewer(ip: string, device: string){
        const full_text = `
<b>Portfolio saytiga yangi tashrifchi!</b>
<b>📍 IP manzil:</b> ${ip}
<b>💻 qurilma:\n</b> ${device}`
            await this.bot.telegram.sendMessage(this.userId, full_text, {parse_mode : 'HTML'})
    }
}