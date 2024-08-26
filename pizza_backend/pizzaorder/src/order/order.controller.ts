import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto } from './dto/update_order.dto';

@Controller('/orders')
export class OrderController
{
    constructor(private readonly ordersServ: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<string> 
  {
    return this.ordersServ.addOrder(createOrderDto);
  }

  @Get()
  async getAllOrders() 
  {
    return this.ordersServ.viewAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id',ParseIntPipe) oid: number) 
  {
    return this.ordersServ.viewOrderById(oid);
  }

  @Patch(':id')
  async updateOrderById(@Param('id',ParseIntPipe) oid: number, @Body() updateOrderDto: UpdateOrderDto): Promise<string> 
  {
    return this.ordersServ.changeOrderById(oid, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrderById(@Param('id',ParseIntPipe) oid: number): Promise<string> 
  {
    return this.ordersServ.removeOrderById(oid);
  }
}
