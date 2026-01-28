import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto : LoginDto){
    try {
      return await this.authService.login(dto)
    } catch (error) {
      throw new HttpException(error.message , error.status??500)
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async testendpoint(){
    return 'ishlitti'
  }
}
