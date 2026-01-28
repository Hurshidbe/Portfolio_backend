import { Prop } from '@nestjs/mongoose';
import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({type : 'string' , description : 'tashkilot nomi', example : 'payme'})
  @IsString()
  @Length(2, 200)
  company: string;

  @ApiProperty({type : 'string', description : 'roli', example : 'junior backend-developer'})
  @IsString()
  @Length(2, 200)
  role: string;

  @ApiProperty({type : 'string',  description : 'nimalar qilgani...', example : 'toychani ishlab chiqdim'})
  @IsString()
  @Length(0, 500)
  description: string;

  @ApiProperty({type : 'string', description : 'tashkilotda ish boshlagan sanasi', example : '12-12-1988' })
  @IsDateString()
  from: Date;

  @ApiProperty({type : 'string', description : 'tashkilotdan haydalgan sanasi, kiritilmasa ham bo`laveradi', example : '12-12-2005' })
  @IsDateString()
  to?: Date;
}
