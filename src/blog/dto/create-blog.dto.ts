import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description : 'projectdan skrinshotlar(0-2 tagacha rasm)',
    required : false
  })
  @IsOptional()
  photos?: any[];

  @ApiProperty({ type: String, description: 'sarlavha' })
  @IsString()
  @Length(2, 500)
  title: string;

  @ApiProperty({ type: String, description: 'blog-post matni' })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
