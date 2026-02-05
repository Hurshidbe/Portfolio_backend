import { IsString, Length } from "class-validator";

export interface lang {
    uz: string;
    ru: string;
    en: string;
}

export class langDto {
    @IsString()
    @Length(0, 5000)
    uz : string =""

    @IsString()
    @Length(0, 5000)
    ru : string =""

    @IsString()
    @Length(0, 5000)
    en : string=""
}