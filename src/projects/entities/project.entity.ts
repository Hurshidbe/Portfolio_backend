import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateBlogDto } from 'src/blog/dto/create-blog.dto';

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
  tecnologies: string[];

  @Prop({ required: false, default: Date.now() })
  deployed_date: Date;

  /////////////////////////////////////////////////////////////

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
