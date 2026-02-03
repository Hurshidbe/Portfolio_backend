import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
export class Achievement {
    @Prop()
    name : string

    @Prop()
    description : string

    @Prop({required : false})
    photos? : string

    @Prop({required : false})
    url? : string

    @Prop({default: Date.now})
    date?: Date
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement)