import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { rejects } from "assert";
import { v2 } from "cloudinary";
import { error } from "console";
import { Http2ServerRequest } from "http2";
import { resolve } from "path";
import { Readable } from "stream";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class CloudinaryService {
  constructor(){
    v2.config({
      cloud_name : process.env.CLOUD_NAME||'',
      api_key : process.env.CLOUD_KEY||'',
      api_secret: process.env.CLOUD_SECRET || ''
    })
  }

  async upload(photos: Express.Multer.File[]) :Promise<string[]>{
    if(!photos || photos.length ===0) return []
    if(photos.length > 3) throw new BadRequestException('photo upload limit is 3')
      try {
        const urls : string[]= []
        for(const photo of photos){
          const result = await this.uploadToCloud(photo)    //// upload service
          urls.push(result.secure_url)
        }
        return urls
      } catch (error) {
        throw new HttpException(error.message , error.status)
      }
  }

  async uploadToCloud(photo : Express.Multer.File) : Promise<any>{
    return new Promise((resolve , reject)=>{
      const allowedFormats = ['image/jpeg', 'image/png' , 'image/webp', 'image/heic', 'image/jpg']
      if(!allowedFormats.includes(photo.mimetype))return reject(new BadRequestException('unallowed file format')) 
      if(photo.size > 5*1024*1024) return reject(new BadRequestException('file size must smaller than 5 Mb'))

      const stream = v2.uploader.upload_stream(
        {
          folder : 'portfolio',
          transformation : [
            {
              quality : 'auto',
              fetch_format : 'auto'
            }
          ]
        },
      (error, result)=>{
        if(error) reject(error)
          else resolve(result)
       }
      )
      Readable.from(photo.buffer).pipe(stream)
    })
  }
}