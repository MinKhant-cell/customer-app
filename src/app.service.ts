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

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const newCustomer = await this.prisma.customer.create({ data: createCustomerDto});
    return newCustomer;
  }

  update(updateCustomerDto: UpdateCustomerDto): string {
    console.log(updateCustomerDto);
    return 'This action update customer data.';
  }

  delete(id: number): string {
    console.log(id);
    return 'This action detele customer data.';
  }
}
