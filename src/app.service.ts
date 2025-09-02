import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from './prisma/prisma.service';
import { CustomerDto } from './dto/customer.dto';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'This is Customer Service!';
  }

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.prisma.customer.findMany();
    return customers;
  }

  async findOne(id: number): Promise<string | CustomerDto> {
    const customer =  await this.prisma.customer.findUnique({where: {id}});
    if(customer){
      return customer;
    }else{
      return `Customer Id: ${id} doesn't exist!`;
    }
    
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const newCustomer = await this.prisma.customer.create({ data: createCustomerDto});
    return newCustomer;
  }

  async update(id, updateCustomerDto: UpdateCustomerDto): Promise<string | CustomerDto> {
    const customer =  await this.prisma.customer.update({where: {id}, data: updateCustomerDto});
    if(customer){
      return customer;
    }else{
      return `Customer Id: ${id} doesn't exist!`;
    }
  }

  async remove(id: number): Promise<CustomerDto> {
    return await this.prisma.customer.delete({where: {id}})
  }
}
