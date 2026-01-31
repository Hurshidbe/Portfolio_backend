import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  project_name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  project_url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  github_url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tecnologies?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  deployed_date: string;
}
