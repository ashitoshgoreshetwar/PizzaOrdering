// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { OrderEntity } from '../../order/entities/order.entity'; 
// import { PizzaEntity } from '../../pizza/entities/pizza.entity'; 

// @Entity('OrderLine')
// export class OrderLineEntity 
// {
//     @PrimaryGeneratedColumn()
//     OrderlineId: number;
  
//     @Column()
//     OrderId: number; 
  
//     @Column()
//     PizzaId: number;
  
//     @Column()
//     Size: string;
  
//     @Column()
//     Quantity: number;
  
//     @Column()
//     TotalAmount: number;
  
//     @ManyToOne(() => OrderEntity, order => order.OrderLines, { onDelete: 'CASCADE' })
//     @JoinColumn({ name: 'OrderId' })
//     Order: OrderEntity;
  
//     @ManyToOne(() => PizzaEntity, pizza => pizza.PizzaId)
//     @JoinColumn({ name: 'PizzaId' })
//     Pizza: PizzaEntity;
// }
// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { OrderEntity } from '../../order/entities/order.entity';
// import { PizzaEntity } from '../../pizza/entities/pizza.entity';

// @Entity('order_line')
// export class OrderLineEntity {
//   @PrimaryGeneratedColumn()
//   orderline_id: number;

//   @Column({ nullable: false })
//   OrderId: number;

//   @Column({ nullable: false })
//   PizzaId: number;

//   @Column({ nullable: false })
//   Size: string;

//   @Column({ nullable: false })
//   Quantity: number;

//   @Column({ nullable: false })
//   TotalAmount: number;

//   @ManyToOne(() => OrderEntity, Order => Order.OrderLines, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'OrderId' })
//   Order: OrderEntity;

//   @ManyToOne(() => PizzaEntity, pizza => pizza.PizzaId)
//   @JoinColumn({ name: 'PizzaId' })
//   Pizza: PizzaEntity;
// }
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { PizzaEntity } from '../../pizza/entities/pizza.entity';

@Entity('OrderLine') 
export class OrderLineEntity {
  @PrimaryGeneratedColumn()
  OrderLineId: number; 

  @Column({ nullable: false })
  OrderId: number; 

  @Column({ nullable: false })
  PizzaId: number; 

  @Column({ nullable: false })
  Size: string; 

  @Column({ nullable: false })
  Quantity: number; 

  @Column({ nullable: false })
  TotalAmount: number;

  // Relationship with OrderEntity
  @ManyToOne(() => OrderEntity, order => order.OrderLines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'OrderId' })
  Order: OrderEntity;

  // Relationship with PizzaEntity
  @ManyToOne(() => PizzaEntity, pizza => pizza.PizzaId)
  @JoinColumn({ name: 'PizzaId' })
  Pizza: PizzaEntity;
}
