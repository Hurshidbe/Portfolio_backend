import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProfileDto {
  @IsString()
  full_name: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  profession: string;

  @IsString()
  @IsOptional()
  profession_add?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsUrl()
  @IsOptional()
  github?: string;

  @IsUrl()
  @IsOptional()
  telegram?: string;

  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @IsUrl()
  @IsOptional()
  cv?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsOptional()
  tools?: string[];
}

export class UpdateProfileDto extends CreateProfileDto {}
