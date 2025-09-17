import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerDto } from './dto/customer.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let prismaService: PrismaService;
  const testCustomer = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '12345',
    isActive: true,
    image: 'default.jpg'
  };
  const mockCustomerService = {
    findAll: jest.fn().mockResolvedValue([testCustomer]),
    findOne: jest.fn().mockResolvedValue(testCustomer),
    create: jest.fn().mockResolvedValue(testCustomer),
    update: jest.fn().mockResolvedValue({ ...testCustomer, name: 'Jane Doe' }),
    remove: jest.fn().mockResolvedValue(testCustomer),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      expect(await appController.findAll()).toEqual([testCustomer]);
    });

    it('should return one customer', async () => {
      expect(await appController.findOne(1)).toEqual(testCustomer);
    });

    it('should create a customer', async () => {
      expect(
        await appController.create({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '12345',
        }),
      ).toEqual(testCustomer);
    });

    it('should update a customer', async () => {
      expect(await appController.update(1, { name: 'Jane Doe' })).toEqual({
        ...testCustomer,
        name: 'Jane Doe',
      });
    });

    it('should delete a customer', async () => {
      expect(await appController.remove(1)).toEqual(testCustomer);
    });
  });
});
