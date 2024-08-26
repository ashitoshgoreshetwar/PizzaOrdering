import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create_order_line.dto';
import { UpdateOrderLineDto } from './dto/update_order_line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLineEntity } from './entities/orderline.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,
  ) { }

  // async create(createOrderLineDto: CreateOrderLineDto): Promise<OrderLineEntity> {
    
  //   const orderLine = this.orderLineRepository.create(createOrderLineDto as DeepPartial<OrderLineEntity>);
  //   return await this.orderLineRepository.save(orderLine);
  // }
  async create(createOrderLineDto: CreateOrderLineDto): Promise<OrderLineEntity> {
    const orderLine = this.orderLineRepository.create(createOrderLineDto);
    return await this.orderLineRepository.save(orderLine);
  }

  findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineRepository.find();
  }

  async findOne(id: number): Promise<OrderLineEntity> {
    const orderLine = await this.orderLineRepository.findOne({ where: { OrderLineId: id } });
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }

  async update(id: number, updateOrderLineDto: UpdateOrderLineDto): Promise<OrderLineEntity> {
    await this.findOne(id); 
    await this.orderLineRepository.update({ OrderLineId: id }, updateOrderLineDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const orderLine = await this.findOne(id);
    await this.orderLineRepository.remove(orderLine);
  }
}
