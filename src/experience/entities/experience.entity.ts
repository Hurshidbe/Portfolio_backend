import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { langDto, type lang } from 'src/shared/types';

@Schema()
export class Experience {
  @Prop()
  company: string;

  @Prop({type : Object})
  role: lang;

  @Prop({ required: false, type: Object })
  description?: lang;

  @Prop()
  from: Date;

  @Prop({ type: Date, required: false })
  to: Date;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
