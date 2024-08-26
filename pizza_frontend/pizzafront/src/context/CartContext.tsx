import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pizza } from '../interfaces/Pizza';

interface CartItem {
  pizza: Pizza;
  quantity: number;
  size: string;
  crust: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (pizza: Pizza, quantity: number, size: string, crust: string) => void;
  removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (pizza: Pizza, quantity: number, size: string, crust: string) => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(item =>
        item.pizza.PizzaId === pizza.PizzaId && item.size === size && item.crust === crust
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { pizza, quantity, size, crust }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevCart => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
