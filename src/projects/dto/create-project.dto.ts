import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({description : 'pryektdan rasmlar', maximum : 3})
  @IsOptional()
  @IsString({ each: true })
  photos?: string[];

  @ApiProperty({type :'string', example : 'ToychaUZ'})
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  project_name: string;

  @ApiProperty({type :'string', example : 'karochi dastur deliver - marketlar to`grisida'})
  @IsString()
  @Length(1, 500)
  description?: string;

  @ApiProperty({type :'string', example : 'https://google.com'})
  @IsNotEmpty()
  @IsUrl()
  project_url: string;

  
  @ApiProperty({type :'string', example : 'https://github.com/hurshidbe'})
  @IsNotEmpty()
  @IsUrl()
  guthub_url: string;

  @ApiProperty({example : 'ishlatilgan texnologiyalar'})
  @IsNotEmpty()
  @IsArray()
  @IsString()
  tecnologies: string[];

  @ApiProperty({type :'string', example : 'loyiha tugallangan sana'})
  @IsNotEmpty()
  @IsDateString()
  deployed_date: string;
}
