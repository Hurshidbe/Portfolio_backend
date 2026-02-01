import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example : 'hurshidbe' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  login: string;

  @ApiProperty({ type: String, example : 'Qazi1221@@' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  password: string;
}
