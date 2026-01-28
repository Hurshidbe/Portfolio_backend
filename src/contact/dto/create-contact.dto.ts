import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({type : String , description : 'yuboruchi ismi'})
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({type : String , description : 'tel-raqam yoki telegram-url'})
  @IsString()
  @Length(2, 100)
  phone_tg: string;

  @ApiProperty({type : String , description : 'xabar mavzusi'})
  @IsString()
  @Length(2, 100)
  theme: string;

  @ApiProperty({type : String , description : 'xabar matni'})
  @IsString()
  @Length(2, 1000)
  text: string;
}
