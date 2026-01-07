import { IsDateString, IsString, Length } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @Length(2, 200)
  company: string;

  @IsString()
  @Length(2, 200)
  role: string;

  @IsString()
  @Length(0, 500)
  description: string;

  @IsDateString()
  from: Date;

  @IsDateString()
  to?: Date;
}
