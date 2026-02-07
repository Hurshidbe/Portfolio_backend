import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Lang } from 'src/shared/types';

@Schema({timestamps : true})
export class Blog {
  @Prop({ required: false })
  photos?: string[];

  @Prop()
  title: Lang;

  @Prop({required: false, type : Object })
  description?: Lang;

  @Prop({ required: false, default: 0 })
  views?: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
