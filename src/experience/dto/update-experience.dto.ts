import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsDateString, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 200)
  company?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 200)
  role?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  to?: Date;
}
