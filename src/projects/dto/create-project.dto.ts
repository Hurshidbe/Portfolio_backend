import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateProjectDto {

    @IsOptional()
    @IsString({each : true})
    photos? : string[]

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    project_name : string

    @IsString()
    @Length(1,500)
    description? : string

    @IsNotEmpty()
    @IsUrl()
    project_url : string

    @IsNotEmpty()
    @IsUrl()
    guthub_url : string

    @IsNotEmpty()
    @IsArray()
    @IsString()
    tecnologies : string[]

    @IsNotEmpty()
    @IsDateString()
    deployed_date : string
}
