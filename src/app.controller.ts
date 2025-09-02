import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.appService.create(createCustomerDto);
  }

  @Patch()
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.appService.update(updateCustomerDto);
  }

  @Delete()
  delete(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.appService.update(updateCustomerDto);
  }
}
