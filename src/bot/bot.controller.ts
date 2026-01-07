import { BotService } from './bot.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create() {
    return this.botService.create();
  }

  @Get()
  findAll() {
    return this.botService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.botService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botService.remove(+id);
  }
}
