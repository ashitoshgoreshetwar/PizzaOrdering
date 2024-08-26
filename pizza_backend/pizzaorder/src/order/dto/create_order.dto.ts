import { IsNotEmpty, IsNumber, IsBoolean, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderLineDto } from 'src/orderLine/dto/create_order_line.dto';


export class CreateOrderDto 
{
  @IsNotEmpty()
  @IsNumber()
  CustomerId: number;

  @IsNotEmpty()
  @IsString()
  DeliveryAddress: string;

  @IsNotEmpty()
  @IsNumber()
  TotalAmount: number;

  @IsNotEmpty()
  @IsBoolean()
  Status: boolean;

  @IsNotEmpty({ message: 'Pizza details required' })
  @IsArray({ message: 'Pizza array required' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  Pizza: CreateOrderLineDto[];
}
