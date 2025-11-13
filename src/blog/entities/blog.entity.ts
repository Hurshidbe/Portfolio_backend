import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Blog{

    @Prop({required : false})
    photos? : string[]

    @Prop()
    title : string

    @Prop()
    text : string

    @Prop({required : false})
    description? : string

    @Prop({required: false, default : 0})
    views ?: number

    @Prop({required:false, default : 0})
    likes? : number
}