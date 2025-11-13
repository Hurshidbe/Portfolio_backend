import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Mode } from 'fs';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
 constructor(
  @InjectModel(Contact.name) private readonly ContactRepo : Model<Contact>
 ){}

 async create(dto : CreateContactDto){
  return await this.ContactRepo.create(dto)
 }

 async find(){
  return await this.ContactRepo.find()
 }

 async findById(id : string){
  return await this.ContactRepo.findById(id)
 }

 async deleteById(id : string){
  return await this.ContactRepo.deleteOne({_id : id}  )
 }
}
