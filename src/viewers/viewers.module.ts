import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Viewer, viewerSchema } from './entities/viewer.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : Viewer.name , schema : viewerSchema}
    ])
  ],
  controllers: [ViewersController],
  providers: [ViewersService],
  exports : [ViewersService]
})
export class ViewersModule {}
