import { IsOptional, IsString, Length } from 'class-validator';

export class CreateBlogDto {
  @IsOptional()
  @IsString()
  photos?: string[];

  @IsString()
  @Length(2, 500)
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
