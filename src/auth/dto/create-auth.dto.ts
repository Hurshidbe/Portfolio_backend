import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({type : String, description : 'login'})
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  login: string;

  @ApiProperty({type : String, description : 'password'})
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  password: string;
}
