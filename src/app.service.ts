import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

@Injectable()
export class AppService {
  private customers = [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      phone: '+664849545',
      status: 'active',
    },
    {
      id: 2,
      name: 'Henery',
      email: 'henery@gmail.com',
      phone: '+663843845',
      status: 'active',
    },
  ];
  constructor() {}

  getHello(): string {
    return 'This is Customer Service!';
  }

  findAll(): Customer[] {
    return this.customers;
  }

  create(createCustomerDto: CreateCustomerDto): string {
    console.log(createCustomerDto.email);
    const newCustomer = {
      ...createCustomerDto,
      id: this.customers.length + 1,
      status: 'active',
    };
    this.customers = [...this.customers, newCustomer];
    return 'This action store customer data.';
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
