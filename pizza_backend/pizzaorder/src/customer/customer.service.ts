import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create_customer.dto'

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService 
{
 
constructor(@InjectRepository(CustomerEntity)private readonly customersRepository: Repository<CustomerEntity>,) {}

  async addCustomer(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> 
  {
    const customer = this.customersRepository.create(createCustomerDto);

    return await this.customersRepository.save(customer);
  }

  async viewAllCustomers(): Promise<CustomerEntity[]> 
  {
    return await this.customersRepository.find();
  }

  async viewCustomerById(cid: number): Promise<CustomerEntity> 
  {
    const customer = await this.customersRepository.findOne(
        {
            where: { CustomerId: cid },
        });
        if (!customer) 
        {
            throw new NotFoundException(`Customer with ID ${cid} not found`);
        }
        return customer;
  }

  async updateCustomerById(cid: number, updateCustomerDto: CreateCustomerDto): Promise<CustomerEntity> 
  {
    await this.customersRepository.update(cid, updateCustomerDto);
    const updatedCustomer = await this.customersRepository.findOne(
    {
      where: { CustomerId: cid },
    });
    if (!updatedCustomer) 
    {
      throw new NotFoundException(`Customer with ID ${cid} not found`);
    }
    return updatedCustomer;
  }

  async deleteCustById(cid: number): Promise<string> 
  {
    const result = await this.customersRepository.delete(cid);
    if (result.affected === 0) 
    {
      throw new NotFoundException(`Customer with ID ${cid} not found`);
    }
    return `Customer with ID ${cid} deleted`;
  }
}