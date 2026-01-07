import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsString()
  photos?: string[];

  @IsOptional()
  @IsString()
  @Length(2, 500)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
