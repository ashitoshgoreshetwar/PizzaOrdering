import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLineDto } from './create_order_line.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {
  @IsOptional()
  @IsNumber({}, { message: 'Order ID must be a number' })
  OrderId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Pizza ID must be a number' })
  PizzaId?: number;

  @IsOptional()
  @IsString({ message: 'Size must be a string' })
  Size?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Quantity must be a number' })
  Quantity?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Total amount must be a number' })
  TotalAmount?: number;
}