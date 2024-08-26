import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaModule } from './pizza/pizza.module';
import { PizzaEntity } from './pizza/entities/pizza.entity';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';
import { CustomerEntity } from './customer/entities/customer.entity';
import { OrderLineEntity } from './orderLine/entities/orderline.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response_interceptors';
import { AllExceptionsFilter } from './interceptors/error_response_interceptor';
import { OrderLineModule } from './orderLine/orderline.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'pizzaorder',
          entities: [PizzaEntity,OrderEntity,CustomerEntity,OrderLineEntity],
          synchronize: true,
        }),
        PizzaModule,
        CustomerModule,
        OrderModule,
        OrderLineModule
      ],
      controllers: [],
      providers: [
        {
          provide: APP_INTERCEPTOR , useClass: ResponseInterceptor
        },
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
        }
      ],
})
export class AppModule {}
