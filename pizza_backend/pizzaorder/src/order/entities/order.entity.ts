import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity'
import { OrderLineEntity } from '../../orderLine/entities/orderline.entity'; 

@Entity('Order')
export class OrderEntity 
{
  @PrimaryGeneratedColumn()
  OrderId: number;

  @Column({ type: 'boolean', nullable: false  })  
  Status: boolean;

  @Column()  
  TotalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  OrderTime: Date; 

  @Column({ type: 'int' })  
  CustomerId: number;

  @Column({ type: 'varchar' })
  DeliveryAddress: string;

  @ManyToOne(() => CustomerEntity, customer => customer.Orders)
  @JoinColumn({ name: 'CustomerId' }) 
  Customer: CustomerEntity;

  @OneToMany(() => OrderLineEntity, orderLine => orderLine.Order, { cascade: true })
  OrderLines: OrderLineEntity[];
}