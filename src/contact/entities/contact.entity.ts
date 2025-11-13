import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Contact {

    @Prop()
    name : string

    @Prop()
    phone_tg : string

    @Prop()
    theme : string

    @Prop()
    text : string
}

export const ContactSchema = SchemaFactory.createForClass(Contact)