import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Viewer {
  @Prop()
  ip_address: string;

  @Prop()
  device_info: string;
}

export const viewerSchema = SchemaFactory.createForClass(Viewer);
