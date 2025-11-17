import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

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
    
        @IsOptional()
        @IsArray()
        @IsString()
        tecnologies? : string[]
    
        @IsOptional()
        @IsDateString()
        deployed_date : string
}
