import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.appService.findOne(id);
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.appService.create(createCustomerDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.appService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
}
