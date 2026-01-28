import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  password: string;
}
