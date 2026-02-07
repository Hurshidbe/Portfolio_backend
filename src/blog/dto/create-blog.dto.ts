import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { langDto } from 'src/shared/types';

export class CreateBlogDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description : 'projectdan skrinshotlar(0-2 tagacha rasm)',
    required : false
  })
  @IsOptional()
  photos?: any[];

  @Transform(({value})=>{return typeof value==='string' ? JSON.parse(value) : value})
  @Type(() => langDto)
  @ApiProperty({
    type: langDto,
    example: {
      uz: 'Blog sarlavhasi',
      ru: 'Заголовок блога',
      en: 'Blog title'
    }
  })
  @IsNotEmptyObject()
  @IsObject()
  title: langDto;

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
  description?: langDto;
}
