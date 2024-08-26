// src/api/pizzaApi.ts
import axios from 'axios';
import { Pizza } from '../interfaces/Pizza';

const axiosapi = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 10000
});

export const getPizzas = async (): Promise<Pizza[]> => {
    try {
        const response = await axiosapi.get<{ Success: boolean; Message: string; Data: Pizza[] }>('/pizzas');
        return response.data.Data;
    } catch (error) {
        console.error('Error fetching pizzas:', error);
        throw error;
    }
};

export const addPizza = async (pizza: Omit<Pizza, 'PizzaId'>): Promise<Pizza> => {
    try {
      const response = await axiosapi.post<Pizza>('/pizzas', pizza);
      return response.data;
    } catch (error) {
      console.error('Error adding pizza:', error);
      throw error;
    }
  };

export const updatePizza = async (id: number, pizza: Omit<Pizza, 'PizzaId'>): Promise<Pizza> => {
    const response = await axiosapi.put<Pizza>(`/pizzas/${id}`, pizza);
    return response.data;
};

export const deletePizza = async (id: number): Promise<void> => {
    await axiosapi.delete(`/pizzas/${id}`);
};
