import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @IsOptional()
  @IsString()
  @Length(2, 200)
  company?: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  role?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsDateString()
  from?: Date;

  @IsOptional()
  @IsDateString()
  to?: Date;
}
