import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderLineEntity } from "src/orderLine/entities/orderline.entity";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { PizzaEntity } from "src/pizza/entities/pizza.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderLineEntity, CustomerEntity, PizzaEntity]), 
      ],
    controllers : [OrderController],
    providers : [OrderService]
})
export class OrderModule{}