// update-profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photos?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profession_add?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  github?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  telegram?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  cv?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  skills?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  tools?: string[];
}
