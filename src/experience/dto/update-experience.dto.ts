import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsDateString, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lang, langDto } from 'src/shared/types';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 200)
  company?: string;

  @Transform(({ value }) => {return typeof value === 'string' ? JSON.parse(value) : value})
    @ApiProperty({
      type: langDto,
      description: 'roli',
      example: {
        uz: "Kichik bekend dasturchi",
        ru: "Младший бэкенд-разработчик",
        en: "Junior backend developer"
      },
    })
    @IsOptional()
    @IsObject()
    role?: langDto;

  @Transform(({value})=>{return typeof value==='string' ? JSON.parse(value) : value})
    @ApiProperty({
      type : langDto,
      example : {
        uz : "Ushbu jumlalarning o'zbek, rus va ingliz tillaridagi ko'rinishi:TilTarjimasiO'zbek tiliMen bu yerda juda ko'p yangi narsalarni o'rgandim va eski bilimlarimni ham mustahkamladim, bu yerdagi ish jarayonimda 3 ta real proyekt qildim.",
        ru : "Я узнал здесь много нового и закрепил свои старые знания, в процессе работы здесь я реализовал 3 реальных проекта.",
        en : "I learned a lot of new things here and strengthened my existing knowledge; I completed 3 real-world projects during my work process here."
      }
    })
    @IsObject()
   description?: langDto;

  @ApiProperty({
      type : 'string',
      example : 'Yerni a*i',
      required : false
    })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  location? : string

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  to?: Date;
}
