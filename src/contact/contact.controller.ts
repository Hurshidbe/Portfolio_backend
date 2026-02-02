import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  @ApiOperation({summary : 'ochiq-api/ adminga habar qoldirish'})
  async create(@Body() dto: CreateContactDto) {
    try {
      return await this.contactService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary : 'barcha habarlarni get qilish'})
  async getAll() {
    try {
      return await this.contactService.find();
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({summary : 'xabarni Idsi orqali get qilish'})
  async getOne(@Param('id') id: string) {
    try {
      return await this.contactService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }


  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({summary : 'xabarni delete qilish'})
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.contactService.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }
}
