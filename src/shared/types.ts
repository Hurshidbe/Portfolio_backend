import { Prop } from "@nestjs/mongoose";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class Lang {
  @Prop({ required: true })
  uz: string;

  @Prop({ required: true })
  ru: string;

  @Prop({ required: true })
  en: string;
}

export class langDto {
    @IsString()
    @Length(1, 5000)
    @IsNotEmpty()
    uz: string;

    @IsString()
    @Length(1, 5000)
    @IsNotEmpty()
    ru: string;

    @IsString()
    @Length(1, 5000)
    @IsNotEmpty()
    en: string;
}