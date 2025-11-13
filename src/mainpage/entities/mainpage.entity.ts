import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Main {
    @Prop()
    photos : string[]

    @Prop()
    full_name : string

    @Prop()
    profession : string

    @Prop()
    profession_add : string

    @Prop()
    address : string

    @Prop()
    github : string // github URI

    @Prop()
    telegram : string // telegram URI

    @Prop()
    linkedin : string // linkedin URI

    @Prop()
    cv : string // CV URI

    @Prop([String])
    skills : string[]

    @Prop([String])
    tools : string[]

}
export const MainSchema = SchemaFactory.createForClass(Main)