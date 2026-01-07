import { BadRequestException, Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME || '',
      api_key: process.env.CLOUD_KEY || '',
      api_secret: process.env.CLOUD_SECRET || '',
    });
  }

  // Bir nechta rasm yuklash
  async upload(
    files: Express.Multer.File[] | Express.Multer.File,
  ): Promise<{ secure_url: string }[]> {
    const filesArr = Array.isArray(files) ? files : files ? [files] : [];
    if (!filesArr.length) return [];

    return await Promise.all(filesArr.map((file) => this.uploadImage(file)));
  }

  // Bitta rasm yuklash
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ secure_url: string }> {
    if (!file.mimetype.startsWith('image/'))
      throw new BadRequestException('Only image files allowed');

    if (file.size > 5 * 1024 * 1024)
      throw new BadRequestException('Image must be smaller than 5 MB');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result || !result.secure_url)
            return reject(new Error('Upload failed: no result returned'));

          resolve({ secure_url: result.secure_url });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
