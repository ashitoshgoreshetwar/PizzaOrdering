// src/interfaces/PizzaCardProps.ts

import { Pizza } from './Pizza';

export interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza, quantity: number, size: string, crust: string) => void;
}
