import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type{ Lang, langDto } from 'src/shared/types';

@Schema()
export class Experience {
  @Prop()
  company: string;

  @Prop({type : Object})
  role: Lang;

  @Prop({ required: false, type: Object })
  description?: Lang;

  @Prop()
  location : string

  @Prop()
  from: Date;

  @Prop({ type: Date, required: false })
  to: Date;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
