import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 // I do not write access token logic, this endpoint works only for me. I think writing refresh token logic and saving it to db is unnecessary work
  @Post('login')
  @ApiOperation({summary : 'login (authToken qaytaradi)'})
  async login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }
}
