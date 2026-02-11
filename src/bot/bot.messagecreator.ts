import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";

@Injectable()
export class MessageSender {
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
            <i>${text}</i>
            🕒 <i>Yuborilgan vaqt: ${new Date().toLocaleString('uz-UZ')}</i>`;
    }
}