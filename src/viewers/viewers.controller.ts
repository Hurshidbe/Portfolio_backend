import { Controller, Get, Body, HttpException, UseGuards } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}


  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({summary : 'private!! saytga kirgan qurilmalar va ularni Ip manzillari'})
  @ApiBearerAuth('JWT-auth')
  findAll() {
    try {
      return this.viewersService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
