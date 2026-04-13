import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Post()
  create(@Body() createUser: { nombre: string; edad: number }) {
    return this.appService.create(createUser);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUser: { nombre?: string; edad?: number },
  ) {
    return this.appService.update(id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
  
}
