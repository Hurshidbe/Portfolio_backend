import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Lang } from 'src/shared/types';

@Schema()
export class Main {
  @Prop()
  photos: any[];

  @Prop()
  full_name: string;

  @Prop()
  profession: Lang;

  @Prop()
  profession_add: Lang;

  @Prop()
  address: string;

  @Prop()
  github: string; // github URI

  @Prop()
  telegram: string; // telegram URI

  @Prop()
  linkedin: string; // linkedin URI

  @Prop()
  instagram: string; // linkedin URI

  @Prop()
  cv: string; // CV URI

  @Prop([String])
  skills: string[];

  @Prop([String])
  tools: string[];
}
export const MainSchema = SchemaFactory.createForClass(Main);
