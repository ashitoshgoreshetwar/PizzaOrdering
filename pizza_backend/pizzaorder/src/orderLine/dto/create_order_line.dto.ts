import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderLineDto 
{
  @IsNotEmpty()
  @IsNumber({},{ message: 'Pizza ID must be a number' })
  PizzaId: number;

  @IsNotEmpty({ message: 'Size is required' })
  @IsString({ message: 'Size must be a string' })
  Size: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Quantity must be a number' })
  Quantity: number;
}

// export class CreateOrderLineDto {
//     readonly OrderId: number;
//     readonly PizzaId: number;
//     readonly Size: string;
//     readonly Quantity: number;
//     readonly TotalAmount: number;
// }
