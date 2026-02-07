import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDate,
  IsDateString, 
  IsNotEmpty, 
  IsNotEmptyObject, 
  IsObject, 
  IsOptional, 
  IsString, 
  IsUrl, 
  Length, 
  ValidateNested 
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { langDto } from 'src/shared/types';

export class CreateAchievementDto {
  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  @Type(() => langDto)
  @ApiProperty({
    type: langDto,
    example: {
      uz: "Najot Ta'lim bitiruv sertifikati",
      ru: "Выпускной сертификат Najot Ta'lim",
      en: "Najot Ta'lim graduation certificate"
    }
  })
  @IsObject()
  @IsNotEmptyObject()
  name: langDto;

  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  @Type(() => langDto)
  @ApiProperty({
    type: langDto,
    example: {
      uz: "Men bu sertifikatni Najot Ta'lim Farg'ona filialida Backend-NodeJS kursini muvaffaqiyatli tugatganim uchun olganman",
      ru: "Я получил этот сертификат за успешное окончание курса Backend-NodeJS в Ферганском филиале Najot Ta'lim",
      en: "I received this certificate for successfully completing the Backend-NodeJS course at the Fergana branch of Najot Ta'lim"
    }
  })
  @IsObject()
  @IsNotEmptyObject()
  description: langDto;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Sertifikat rasmi',
    format: 'binary',
  })
  @IsOptional()
  photos?: any;

  @ApiProperty({
    required: false,
    example: 'https://bestmemes.ucoz.net/news/sertifikat_dolbojoba/2022-03-22-2625',
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({
    required: false,
    example: '2025-10-15',
  })
  @IsOptional()
  @IsDate()
  date?: Date;
}
