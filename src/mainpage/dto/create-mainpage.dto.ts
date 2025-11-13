import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProfileDto {
  @IsString()
  full_name: string;

  @IsString()
  @IsOptional()
  photos?: string[];

  @IsString()
  profession: string;

  @IsString()
  @IsOptional()
  profession_add?: string;

  @IsString()
  address?: string;

  @IsUrl()
  github?: string;

  @IsUrl()
  @IsOptional()
  telegram?: string;

  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  cv?: string;


  @IsArray()
  skills?: string[];

  @IsArray()
  tools?: string[];
}

export class UpdateProfileDto extends CreateProfileDto {}
