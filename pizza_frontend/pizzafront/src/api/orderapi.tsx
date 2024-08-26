import axios from 'axios';
import { Order } from '../interfaces/Order';
import { OrderLine } from '../interfaces/OrderLine';

const axiosapi = axios.create({
    baseURL: 'http://localhost:5000/api/v1/orders',
    timeout: 10000,
});

// export const addOrder = async (orderData: Omit<Order, 'OrderId'>): Promise<Order> => {
//     try {
//         const response = await axiosapi.post<Order>('/', orderData);
//         return response.data;
//     } catch (error) {
//         console.error('Error placing order:', error);
//         throw error;
//     }
// };
export const addOrder = async (orderData: Omit<Order, 'OrderId'>): Promise<Order> => {
    try {
        const response = await axiosapi.post<Order>('/', orderData);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await axiosapi.get<{ Success: boolean; Message: string; Data: Order[] }>('/');
        console.log('API Response:', response.data); // Debugging line to inspect the response
        return response.data.Data; // Accessing the Data field in the response
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (id: number): Promise<Order> => {
    try {
        const response = await axiosapi.get<Order>(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching order with ID ${id}:`, error);
        throw error;
    }
};

// export const updateOrder = async (id: number, updateData: Partial<Order>): Promise<Order> => {
//     try {
//         const response = await axiosapi.patch<Order>(`/${id}`, updateData);
//         return response.data;
//     } catch (error) {
//         console.error(`Error updating order with ID ${id}:`, error);
//         throw error;
//     }
// };


export const updateOrder = async (id: number, updateData: Partial<Order>): Promise<Order> => {
    try {
        const response = await axiosapi.patch<{ data: Order }>(`/${id}`, updateData);
        return response.data.data; // Accessing the data property in the response
    } catch (error) {
        console.error(`Error updating order with ID ${id}:`, error);
        throw error;
    }
};

export const deleteOrder = async (id: number): Promise<void> => {
    try {
        await axiosapi.delete(`/${id}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${id}:`, error);
        throw error;
    }
};

