import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Lang } from 'src/shared/types';

@Schema({ timestamps: true })
export class Project {
  @Prop({ default: [] })
  photos: string[];

  @Prop()
  project_name: string;

  @Prop()
  description: Lang;

  @Prop()
  project_url: string;

  @Prop()
  github_url: string;

  @Prop()
  technologies: string[];

  @Prop({ required: false, default: Date.now() })
  deployed_date: Date;

  /////////////////////////////////////////////////////////////

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
