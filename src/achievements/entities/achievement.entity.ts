import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { lang } from "src/shared/types";

@Schema({timestamps : true})
export class Achievement {
    @Prop({type : Object})
    name : lang

    @Prop({type : Object})
    description : lang

    @Prop({required : false})
    photos? : string

    @Prop({required : false})
    url? : string

    @Prop({default: Date.now})
    date?: Date
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement)