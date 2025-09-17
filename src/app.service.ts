import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from './prisma/prisma.service';
import { CustomerDto } from './dto/customer.dto';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getHello(): string {
    return 'This is Customer Service!';
  }

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.prisma.customer.findMany();
    return customers;
  }

  async findOne(id: number): Promise<string | CustomerDto> {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (customer) {
      return customer;
    } else {
      throw new NotFoundException(`Customer Id: ${id} doesn't exist!`, {
        cause: new Error(),
        description: 'Customer Not Found',
      });
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const newCustomer = await this.prisma.customer.create({
      data: createCustomerDto,
    });
    return newCustomer;
  }

  async update(
    id,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<string | CustomerDto> {
    try {
      const customer = await this.prisma.customer.findUnique({ where: { id } });
      if (!customer)
        throw new NotFoundException(`Customer Id: ${id} doesn't exist!`, {
          cause: new Error(),
          description: 'Customer Not Found',
        });
      return await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message.',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async uploadImage(id, filePath: string): Promise<string | CustomerDto> {
    try {
      const customer = await this.prisma.customer.findUnique({ where: { id } });
      if (!customer)
        throw new NotFoundException(`Customer Id: ${id} doesn't exist!`, {
          cause: new Error(),
          description: 'Customer Not Found',
        });
      return await this.prisma.customer.update({
        where: { id },
        data: {
          image: filePath
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message.',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: number): Promise<string | CustomerDto> {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (customer) {
      return await this.prisma.customer.delete({ where: { id } });
    } else {
      throw new NotFoundException(`Customer Id: ${id} doesn't exist!`, {
        cause: new Error(),
        description: 'Customer Not Found',
      });
    }
  }
}
