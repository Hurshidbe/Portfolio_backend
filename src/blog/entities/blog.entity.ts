import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps : true})
export class Blog {
  @Prop({ required: false })
  photos?: string[];

  @Prop()
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false, default: 0 })
  views?: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
