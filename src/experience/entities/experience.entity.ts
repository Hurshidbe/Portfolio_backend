import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Experience {

    @Prop()
    company : string

    @Prop()
    role : string

    @Prop({required : false})
    description : string

    @Prop()
    from : Date

    @Prop({default : Date.now()})
    to? : Date

}

export const ExperienceSchema = SchemaFactory.createForClass(Experience)
