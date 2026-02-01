import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProfileDto {
  @ApiProperty({ example: 'Baqay tog`a' })
  @IsString()
  full_name: string;

  @ApiProperty({ required: true, description: 'kasbi', example: 'loychi' })
  @IsString()
  profession: string;

  @ApiProperty({
    description: 'O`zi haqida ma`lumot',
    required: false,
    example: `to'g'risini aytadigan bo'lsam men dunyoni 8-mo'jizasimanda😁`,
  })
  @IsString()
  @IsOptional()
  profession_add?: string;

  @ApiProperty({ description: 'manzil', required: false, example: 'xuytepa mahallasi' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Github URL', required: false, example: 'https://github.com/baqay' })
  @IsUrl()
  @IsOptional()
  github?: string;

  @ApiProperty({ description: 'Telegram URL', required: false, example: 'https://t.me/baqay' })
  @IsUrl()
  @IsOptional()
  telegram?: string;

  @ApiProperty({ description: 'LinkedIn URL', required: false, example: 'https://google.com' })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @ApiProperty({ description: 'Skills', type: [String], required: false })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((i) => i.trim()).filter((i) => i !== '');
    }
    if (Array.isArray(value)) {
      return value.join(',').split(',').map((i) => i.trim()).filter((i) => i !== '');
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({ description: 'Tools', type: [String], required: false })
  @IsOptional()
  @Transform(({ value}) => {
    if (typeof value==='string') {
      return value.split(',').map((i)=>i.trim()).filter((i)=>i !=='');
    }
    if (Array.isArray(value)) {
      return value.join(',').split(',').map((i)=> i.trim()).filter((i)=>i !== '');
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  tools?: string[];

  @ApiProperty({
    format: 'binary',
    description: 'Profil rasmi(1 dona rasm bo`lishi shart)',
    required: false,
  })
  @IsOptional()
  photos?: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'CV fayl',
    required: false,
  })
  @IsOptional()
  cv?: any;
}
