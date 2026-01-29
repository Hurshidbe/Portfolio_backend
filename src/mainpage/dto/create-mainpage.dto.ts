import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    type: 'string',
    description: 'to`liq ismi',
    example: 'eshmatov toshman',
  })
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'profili uchun rasm (majburiy emas)' })
  @IsString()
  @IsOptional()
  photos?: string[];

  @ApiProperty({ description: 'kasbi' })
  @Prop()
  @IsString()
  profession: string;

  @ApiProperty({ description: 'o`zi haqida biroz ma`lumot' })
  @IsString()
  @IsOptional()
  profession_add?: string;

  @ApiProperty({ type: 'string', description: 'mazili' })
  @IsString()
  address?: string;

  @ApiProperty({ type: 'string', description: 'github url, url bolishi shart' })
  @IsUrl()
  github?: string;

  @ApiProperty({
    type: 'string',
    description: 'telegram url, url bolishi shart',
  })
  @IsUrl()
  @IsOptional()
  telegram?: string;

  @ApiProperty({
    type: 'string',
    description: 'linkedin url, url bolishi shart',
  })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @ApiProperty({
    description: `cv/resume  , formatlar : pdf/word/doc/jpg/png...`,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  cv?: string;

  @ApiProperty({ description: 'skillar' })
  @IsArray()
  skills?: string[];

  @ApiProperty({ description: 'toollar' })
  @IsArray()
  tools?: string[];
}

export class UpdateProfileDto extends CreateProfileDto {}
