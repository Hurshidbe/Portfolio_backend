import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(dto : CreateContactDto){
    try {
      return await this.contactService.create(dto)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Get()
  async getAll(){
    try {
      return await this.contactService.find()
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Get(':id')
  async getOne(@Param('id') id : string){
    try {
      return await this.contactService.findById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id') id : string){
    try {
      return await this.contactService.deleteById(id)
    } catch (error) {
      throw new HttpException(error.message , error.status)
    }
  }
}
