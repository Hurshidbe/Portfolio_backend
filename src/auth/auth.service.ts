import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(dto: LoginDto) {
    const admin_login = process.env.LOGIN || Logger.log('login is undefined');
    const admin_password =
      process.env.PASSWORD || Logger.log('password is undefined');
    if (dto.login !== admin_login || dto.password !== admin_password)
      throw new UnauthorizedException('incorrect login or password');
    return await this.jwtService.signAsync({ user: admin_login }, {expiresIn: '24h'})
  }
}
