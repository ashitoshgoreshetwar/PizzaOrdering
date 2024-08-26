import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put} from '@nestjs/common';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create_customer.dto';

@Controller('/customers')
export class CustomerController
{
    constructor(private readonly customersServ: CustomerService) {}

    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<{ message: string; customer: CustomerEntity }>
    {
        const customer = await this.customersServ.addCustomer(createCustomerDto);
        return { message: `Customer with ID ${customer.CustomerId} added`, customer };
    }
    
    @Get()
    async getAllCustomers(): Promise<CustomerEntity[]>
    {
        return this.customersServ.viewAllCustomers();
    }

    @Get(':id')
    async getCustomerById(@Param('id',ParseIntPipe) cid: number): Promise<CustomerEntity> 
    {
        return this.customersServ.viewCustomerById(cid);
    }

    @Patch(':id')
    async updateCustomerById(@Param('id',ParseIntPipe) cid: number, @Body() updateCustomerDto: CreateCustomerDto): Promise<{ message: string; customer: CustomerEntity }>
    {
        const customer = await this.customersServ.updateCustomerById(cid, updateCustomerDto);
        return { message: `Customer with ID ${customer.CustomerId} updated`, customer };
    }

    @Delete(':id')
    async deleteCustomer(@Param('id',ParseIntPipe) cid: number): Promise<{ message: string }> 
    {
        const message = await this.customersServ.deleteCustById(cid);
        return { message };
    }
}
