import { Prop } from '@nestjs/mongoose';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, Length } from 'class-validator';
import { execArgv } from 'process';
import { langDto } from 'src/shared/types';

export class CreateExperienceDto {
  @ApiProperty({
    type: 'string',
    description: 'tashkilot nomi',
    example: 'payme',
  })
  @IsString()
  @Length(2, 200)
  company: string;

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
  @IsNotEmptyObject()
  @IsObject()
  role: langDto;

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
  @IsNotEmptyObject()
  description: langDto;

  @ApiProperty({
    type : 'string',
    example : 'Yerni a*i',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  location : string

  @ApiProperty({
    type: 'string',
    description: 'tashkilotda ish boshlagan sanasi',
    example: '1988-12-12',
  })
  @IsDateString()
  from: Date;

  @ApiProperty({
    type: 'string',
    description: 'tashkilotdan haydalgan sanasi, kiritilmasa ham bo`laveradi',
    example: '2005-12-12',
  })
  @IsDateString()
  to?: Date;
}
