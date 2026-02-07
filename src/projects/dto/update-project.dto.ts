import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { langDto } from 'src/shared/types';

export class UpdateProjectDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'projectdan skrinshotlar(0-3 tagacha rasm)',
    required: false,
  })
  @IsOptional()
  photos?: any[];

  @ApiProperty({ type: 'string', example: 'ToychaUZ', required: false })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  project_name?: string;

  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  @ApiProperty({
      description : 'project haqida qisqacha ma`lumot',
      type: langDto,
      example: {
        uz :"Yuqori yuklamali tizimlar va samarali API-lar yaratuvchi backend dasturchiman. Murakkab muammolarga sodda va optimal texnik yechimlar topishni yoqtiraman.",
        ru: "Backend-разработчик, специализирующийся на высоконагруженных системах и эффективных API. Создаю чистый код и оптимальные архитектурные решения",
        en: "Backend developer focused on building high-load systems and efficient APIs. I enjoy finding simple and optimal technical solutions to complex problems."
      },
    })
    @IsObject()
    @IsOptional()
    description?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://google.com',
    description: 'project linki',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  project_url?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://github.com/hurshidbe',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  github_url?: string;

  @ApiProperty({
  description: 'ishlatilgan texnologiyalar',
  type: [String],
  required: false,
  example: ['React', 'Node.js', 'MongoDB'],
})
@IsOptional()
@Transform(({ value }) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(i => i.toString().trim()).filter(i => i !== '');
  return value.toString().split(',').map(i => i.trim()).filter(i => i !== '');
})
@IsArray()
@IsString({ each: true })
technologies?: string[];


  @ApiProperty({ type: 'string', example: '2025-12-12', required: false })
  @IsOptional()
  @IsDateString()
  deployed_date?: string;
}
