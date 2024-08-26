// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create_order.dto'
// import { InjectRepository } from '@nestjs/typeorm';
// import { OrderEntity } from './entities/order.entity';
// import { Repository } from 'typeorm';
// import { OrderLineEntity } from 'src/orderLine/entities/orderline.entity';
// import { PizzaEntity } from 'src/pizza/entities/pizza.entity';

// @Injectable()
// export class OrderService
// {
//     constructor(
//         @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
//         @InjectRepository(OrderLineEntity) private orderLineRepository: Repository<OrderLineEntity>,
//         @InjectRepository(PizzaEntity) private pizzaRepository: Repository<PizzaEntity>,
//       ) {}

//       private pizzaSizes = ['regular', 'medium', 'large'];

//       returnTotalBill(Pizza: PizzaEntity, Size: string, Quantity: number): number 
//       {
//         if (!this.pizzaSizes.includes(Size)) 
//         {
//           throw new Error('Invalid pizza size');
//         }
    
//         let amount;

//         switch (Size) 
//         {
//           case 'regular':
//             amount = Pizza.RegularSizePrice;
//             break;
//           case 'medium':
//             amount = Pizza.MediumSizePrice;
//             break;
//           case 'large':
//             amount = Pizza.LargeSizePrice;
//             break;
//           default:
//             throw new Error('Invalid pizza size');
//         }
//         return amount * Quantity;
//       }
    
//       async addOrder(createOrderDto: CreateOrderDto): Promise<string> 
//       {
//         const { CustomerId, DeliveryAddress, Status, Pizza } = createOrderDto;
    
//         const neworder = this.orderRepository.create({
//             CustomerId,
//             DeliveryAddress,
//             TotalAmount: 0, 
//             Status,
//         });
    
//         const savedOrder = await this.orderRepository.save(neworder);
    
//         let totalAmount = 0;
//         for (const line of Pizza) 
//         {
//         const pizzaEntity = await this.pizzaRepository.findOne({ where: { PizzaId: line.PizzaId } });
//         if (!pizzaEntity) 
//         {
//             throw new NotFoundException(`Pizza with ID ${line.PizzaId} not found`);
//         }
    
//         const orderlineAmount = this.returnTotalBill(pizzaEntity, line.Size, line.Quantity);
//         totalAmount = totalAmount + orderlineAmount;
    
//           const orderLine = this.orderLineRepository.create({
//             OrderId: savedOrder.OrderId,
//             PizzaId: pizzaEntity.PizzaId,
//             Size: line.Size,
//             Quantity: line.Quantity,
//             TotalAmount: orderlineAmount,
//           });
    
//           await this.orderLineRepository.save(orderLine);
//         }
    
//         savedOrder.TotalAmount = totalAmount;
//         await this.orderRepository.save(savedOrder);
    
//         return `Order #${savedOrder.OrderId} has been successfully created.`;
//       }
    
//       async viewAllOrders(): Promise<OrderEntity[]> 
//       {
//         return await this.orderRepository.find({ relations: ['OrderLines'] });
//       }
    
//       async viewOrderById(oid: number): Promise<OrderEntity> {
//         const order = await this.orderRepository.findOne(
//         {
//           where: { OrderId: oid },
//           relations: ['OrderLines'],
//         });
//         if (!order) 
//         {
//           throw new NotFoundException(`Order #${oid} not found`);
//         }
//         return order;
//       }
    
//       async changeOrderById(oid: number, updateOrderDto: CreateOrderDto): Promise<string> {
//         const order = await this.orderRepository.preload(
//         {
//           OrderId: oid,
//           ...updateOrderDto,
//         });
//         if (!order) 
//         {
//           throw new NotFoundException(`Order #${oid} not found`);
//         }
//         await this.orderRepository.save(order);
//         return `Order #${oid} has been successfully updated.`;
//       }
    
//       async removeOrderById(oid: number): Promise<string> 
//       {
//         const order = await this.viewOrderById(oid);
//         await this.orderRepository.remove(order);
//         return `Order #${oid} has been successfully deleted.`;
//       }
// }

// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create_order.dto';
// import { UpdateOrderDto } from './dto/update_order.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { OrderEntity } from './entities/order.entity';
// import { OrderLineEntity } from '../orderLine/entities/orderline.entity';
// import { PizzaEntity } from '../pizza/entities/pizza.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
//     @InjectRepository(OrderLineEntity) private readonly orderLineRepository: Repository<OrderLineEntity>,
//     @InjectRepository(PizzaEntity) private readonly pizzaRepository: Repository<PizzaEntity>,
//   ) { }

//   private readonly validSizes = ['regular', 'medium', 'large'];

//   calculateTotalLineAmount(pizza: PizzaEntity, size: string, quantity: number): number {
//     if (!this.validSizes.includes(size)) {
//       throw new BadRequestException('Invalid pizza size');
//     }

//     let price;
//     switch (size) {
//       case 'regular':
//         price = pizza.RegularSizePrice;
//         break;
//       case 'medium':
//         price = pizza.mediumPrice;
//         break;
//       case 'large':
//         price = pizza.largePrice;
//         break;
//       default:
//         throw new BadRequestException('Invalid pizza size');
//     }

//     return price * quantity;
//   }

//   async addOrder(createOrderDto: CreateOrderDto): Promise<string> {
//     const { CustomerId, DeliveryAddress, Status, Pizza } = createOrderDto;

//     const order = this.orderRepository.create({
//       CustomerId,
//       DeliveryAddress,
//       TotalAmount: 0,
//       Status,
//     });

//     const savedOrder = await this.orderRepository.save(order);

//     let totalAmount = 0;
//     for (const line of Pizza) {
//       const pizzaEntity = await this.pizzaRepository.findOne({ where: { PizzaId: line.PizzaId } });
//       if (!pizzaEntity) {
//         throw new NotFoundException(`Pizza with ID ${line.PizzaId} not found`);
//       }

//       const lineAmount = this.calculateTotalLineAmount(pizzaEntity, line.Size, line.Quantity);
//       totalAmount += lineAmount;

//       const orderLine = this.orderLineRepository.create({
//         OrderId: savedOrder.OrderId,
//         PizzaId: pizzaEntity.PizzaId,
//         size: line.Size,
//         quantity: line.Quantity,
//         total_amount: lineAmount,
//       });

//       await this.orderLineRepository.save(orderLine);
//     }

//     savedOrder.TotalAmount = totalAmount;
//     await this.orderRepository.save(savedOrder);

//     return `Order #${savedOrder.OrderId} has been successfully created.`;
//   }

//   async viewAllOrders(): Promise<OrderEntity[]> {
//     return await this.orderRepository.find({ relations: ['orderLines'] });
//   }

//   async viewOrderById(id: number): Promise<OrderEntity> {
//     const order = await this.orderRepository.findOne({
//       where: { OrderId: id },
//       relations: ['orderLines'],
//     });
//     if (!order) {
//       throw new NotFoundException(`Order #${id} not found`);
//     }
//     return order;
//   }

//   async changeOrderById(id: number, updateOrderDto: UpdateOrderDto): Promise<string> {
//     const order = await this.orderRepository.preload({
//       OrderId: id,
//       ...updateOrderDto,
//     });
//     if (!order) {
//       throw new NotFoundException(`Order #${id} not found`);
//     }
//     await this.orderRepository.save(order);
//     return `Order #${id} has been successfully updated.`;
//   }

//   async removeOrderById(id: number): Promise<any> {
//     const order = await this.viewOrderById(id);
//     await this.orderRepository.remove(order);
//   }
// }
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto } from './dto/update_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderLineEntity } from '../orderLine/entities/orderline.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderLineEntity) private readonly orderLineRepository: Repository<OrderLineEntity>,
    @InjectRepository(PizzaEntity) private readonly pizzaRepository: Repository<PizzaEntity>,
  ) {}

  private readonly checkSizes = ['regular', 'medium', 'large'];

  private calculateTotalLineAmount(pizza: PizzaEntity, size: string, quantity: number): number {
    if (!this.checkSizes.includes(size)) {
      throw new BadRequestException('Invalid pizza size');
    }

    let sizeprize;
    switch (size) {
      case 'regular':
        sizeprize = pizza.RegularSizePrice;
        break;
      case 'medium':
        sizeprize = pizza.MediumSizePrice;
        break;
      case 'large':
        sizeprize = pizza.LargeSizePrice;
        break;
      default:
        throw new BadRequestException('Invalid pizza size. please choose valid size');
    }

    return sizeprize * quantity;
  }
/////////////////////////////////////////////////////////////////////////////////////
  async addOrder(createOrderDto: CreateOrderDto): Promise<string> {
    const { CustomerId, DeliveryAddress, Status, Pizza } = createOrderDto;

    const order = this.orderRepository.create({
      CustomerId,
      DeliveryAddress,
      TotalAmount:createOrderDto.TotalAmount,
      Status,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalAmount = 0;
    for (const line of Pizza) {
      const pizzaEntity = await this.pizzaRepository.findOne({ where: { PizzaId: line.PizzaId } });
      if (!pizzaEntity) {
        throw new NotFoundException(`Pizza with ID *${line.PizzaId} not found`);
      }

      const lineAmount = this.calculateTotalLineAmount(pizzaEntity, line.Size, line.Quantity);
      totalAmount = totalAmount+lineAmount;

      const orderLine = this.orderLineRepository.create({
        OrderId: savedOrder.OrderId,
        PizzaId: pizzaEntity.PizzaId,
        Size: line.Size,
        Quantity: line.Quantity,
        TotalAmount: lineAmount,
      });

      await this.orderLineRepository.save(orderLine);
    }

    savedOrder.TotalAmount = totalAmount;
    await this.orderRepository.save(savedOrder);

    return `Order *${savedOrder.OrderId} has been successfully created.`;
  }
///////////////////////////////////////////////////////////////////
  async viewAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ relations: ['OrderLines'] });
  }

  async viewOrderById(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { OrderId: id },
      relations: ['OrderLines'],
    });
    if (!order) {
      throw new NotFoundException(`Order *${id} not found`);
    }
    return order;
  }

  async changeOrderById(id: number, updateOrderDto: UpdateOrderDto): Promise<string> {
    const order = await this.orderRepository.preload({
      OrderId: id,
      ...updateOrderDto,
    });
    if (!order) {
      throw new NotFoundException(`Order *${id} not found`);
    }
    await this.orderRepository.save(order);
    return `Order *${id} has been successfully updated.`;
  }

  async removeOrderById(id: number): Promise<string> {
    const order = await this.viewOrderById(id);
    await this.orderRepository.remove(order);
    return `Order *${id} has been successfully deleted.`;
  }
}
