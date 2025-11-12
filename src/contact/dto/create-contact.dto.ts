import { IsString, Length } from "class-validator";

export class CreateContactDto {
    @IsString()
    @Length(2,100)
    name : string

    @IsString()
    @Length(2, 100)
    phone_tg :string

    @IsString()
    @Length(2,100)
    theme : string

    @IsString()
    @Length(2,1000)
    message : string
    
}
