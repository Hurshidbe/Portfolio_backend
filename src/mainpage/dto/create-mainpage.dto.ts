import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmptyObject, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { langDto } from 'src/shared/types';

export class CreateProfileDto {
  @ApiProperty({ example: 'Baqay tog`a' })
  @IsString()
  full_name: string;

  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  @Type(()=>langDto)
  @ApiProperty({
    type : langDto,
    required : true,
    example : {
      uz: "Kichik bekend dasturchi",
      ru: "Младший бэкенд-разработчик",
      en: "Junior backend developer"
    }
  })
  @IsObject()
  @IsNotEmptyObject()
  profession: langDto;

  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  @Type(()=>langDto)
  @ApiProperty({
    required : true,
    type : langDto,
    example : {
      uz:"Yangi narsalarni o'rganishdan zerikmaydigan backend dasturchi",
      ru:"Бэкенд-разработчик, который никогда не устает изучать новое",
      en:"A backend developer who never gets bored of learning new things",
    }
  })
  @IsObject()
  @IsNotEmptyObject()
  profession_add: langDto;

  @ApiProperty({ description: 'manzil', required: false, example: 'xuytepa mahallasi' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Github URL', required:false, example: 'https://github.com/baqay' })
  @IsUrl()
  @IsOptional()
  github?: string;

  @ApiProperty({ description: 'Telegram URL', required: false, example: 'https://t.me/baqay' })
  @IsUrl()
  @IsOptional()
  telegram?: string;

  @ApiProperty({ description: 'LinkedIn URL', required: false, example: 'https://google.com' })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @ApiProperty({ description: 'Skills', type: [String], required:false })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => i.trim()).filter((i) => i !== '');
    }
    if (Array.isArray(value)) {
      return value.join(',').split(',').map((i) => i.trim()).filter((i) => i !== '');
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({ description: 'Tools', type: [String], required: false })
  @IsOptional()
  @Transform(({ value}) => {
    if (typeof value==='string') {
      return value.split(',').map((i)=>i.trim()).filter((i)=>i !=='');
    }
    if (Array.isArray(value)) {
      return value.join(',').split(',').map((i)=> i.trim()).filter((i)=>i !== '');
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  tools?: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Profil rasmi(1 dona rasm bo`lishi shart)',
    required: false,
  })
  @IsOptional()
  photos?: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'CV fayl',
    required: false,
  })
  @IsOptional()
  cv?: any;
}
