import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAchievementDto } from './create-achievement.dto';
import { IsDate, IsDateString, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { langDto } from 'src/shared/types';
import { Type } from 'class-transformer';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {
    @ApiProperty({type : langDto})
    @IsOptional()
    @Type(()=>langDto)
    name?: langDto;
    
    @ApiProperty({type : langDto})
      description?: langDto;
    
      @ApiProperty({
        required: false,
        type : 'string',
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
