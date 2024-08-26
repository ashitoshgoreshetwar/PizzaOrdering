import React from "react";
export interface OrderLine {
    OrderLineId: number;
    PizzaId: number;
    OrderId : number;
    Size: string;
    Quantity: number;
    TotalAmount: number;
}