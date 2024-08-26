import { OrderLine } from "./OrderLine";

export interface Order {

    OrderId: number;
    CustomerId: number;
    DeliveryAddress: string;
    Status: boolean; 
    TotalAmount: number;
    OrderLines: OrderLine[];
}

