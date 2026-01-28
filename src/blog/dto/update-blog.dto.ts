import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({description : 'rasm yuborilmasa avval yuborilgan rasmlar saqlanadi'})
  @IsOptional()
  @IsString()
  photos?: string[];

  @ApiProperty({type : String})
  @IsOptional()
  @IsString()
  @Length(2, 500)
  title?: string;

  @ApiProperty({type : String})
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
