import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAchievementDto {
  @ApiProperty({
    description: 'sertifikat nomi',
    example: "Najot ta'lim backend-nodeJs",
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  name: string;

  @ApiProperty({
    description: "qisqacha ta'rif",
    example:
      "Najot ta'limda backend-nodeJs kursini muvaffaqiyatli tugatdim",
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 500)
  description: string;

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
  @IsDateString()
  date?: Date;
}
