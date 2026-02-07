import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmptyObject, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { langDto } from 'src/shared/types';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'rasm yuborilmasa avval yuborilgan rasmlar saqlanadi'
  })
  @IsOptional()
  photos?: any[];

  @Transform(({value})=>{return typeof value==='string' ? JSON.parse(value) : value})
  @ApiProperty({
    type: langDto,
    example: {
      uz: 'Blog sarlavhasi',
      ru: 'Заголовок блога',
      en: 'Blog title'
    }
  })
  @IsOptional()
  @IsObject()
  title?: langDto;

  @Transform(({value})=>{return typeof value==='string' ? JSON.parse(value) : value})
  @Type(() => langDto)
  @ApiProperty({
    type: langDto,
    example: {
      uz: 'Blog matni',
       ru: 'Содержание блога',
       en: 'Blog content'
     }
  })
   @IsOptional()
   @IsObject()
   description?: langDto
  }
