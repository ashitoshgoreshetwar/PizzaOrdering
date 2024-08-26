import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity('Customer')
export class CustomerEntity 
{
  @PrimaryGeneratedColumn()
  CustomerId: number;

  @Column({ nullable: false })
  FirstName: string;

  @Column({ nullable: false })
  LastName: string;

  @Column({ nullable: false })
  Address: string;

  @Column({ unique: true, nullable: false })
  PhoneNumber: string;

  @Column({ unique: true, nullable: false })
  EmailAddress: string;

  @OneToMany(() => OrderEntity, order => order.Customer)
  Orders: OrderEntity[];
}