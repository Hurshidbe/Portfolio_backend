import { PartialType } from '@nestjs/mapped-types';
import { CreateMainpageDto } from './create-mainpage.dto';

export class UpdateMainpageDto extends PartialType(CreateMainpageDto) {}
