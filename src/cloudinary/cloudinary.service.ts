import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { v2 } from "cloudinary";
import { Readable } from "stream";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME || "",
      api_key: process.env.CLOUD_KEY || "",
      api_secret: process.env.CLOUD_SECRET || "",
    });
  }

  // Fayllar array yoki bitta fayl bo‘lishi mumkin
  async upload(files: Express.Multer.File[] | Express.Multer.File): Promise<string[]> {
    const filesArr = Array.isArray(files) ? files : files ? [files] : [];
    if (!filesArr.length) return [];

    const urls = await Promise.all(filesArr.map(file => this.uploadToCloud(file)));
    return urls.map(res => res.secure_url);
  }

  // Bitta faylni Cloudinary ga upload qiladi
  async uploadToCloud(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/heic",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];

      if (!allowedFormats.includes(file.mimetype))
        return reject(new BadRequestException("Unallowed file format"));

      if (file.size > 5 * 1024 * 1024)
        return reject(new BadRequestException("File size must be smaller than 5 MB"));

      const stream = v2.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: "auto", // ✅ rasm, pdf, word avtomatik aniqlanadi
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }
}
