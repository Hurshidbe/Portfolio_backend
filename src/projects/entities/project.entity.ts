import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Project {
  @Prop({ default: [] })
  photos: string[];

  @Prop()
  project_name: string;

  @Prop({ default: '' })
  description: string;

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
