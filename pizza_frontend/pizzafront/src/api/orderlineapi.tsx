import axios from 'axios';
import { OrderLine } from '../interfaces/OrderLine';

const orderLineApi = axios.create({
    baseURL: 'http://localhost:5000/api/v1/orderline',
    timeout: 10000,
});

// Fetch all order lines
export const getOrderLines = async (): Promise<OrderLine[]> => {
    try {
        const response = await orderLineApi.get<{ Success: boolean; Message: string; Data: OrderLine[] }>('/');
        return response.data.Data;
    } catch (error) {
        throw new Error('Failed to fetch order lines');
    }
};


export const getOrderLineById = async (id: number): Promise<OrderLine> => {
    try {
        const response = await orderLineApi.get<{ Success: boolean; Message: string; Data: OrderLine }>(`/${id}`);
        return response.data.Data;
    } catch (error) {
        throw new Error(`Failed to fetch order line with ID ${id}`);
    }
};

// export const createOrderLine = async (orderLineData: Partial<OrderLine>): Promise<OrderLine> => {
//     try {
//         const response = await orderLineApi.post<{ Success: boolean; Message: string; Data: OrderLine }>('/', orderLineData);
//         return response.data.Data;
//     } catch (error) {
//         throw new Error('Failed to create order line');
//     }
// };
export const createOrderLine = async (orderLineData: Partial<OrderLine>): Promise<OrderLine> => {
    try {
        const response = await orderLineApi.post<{ Success: boolean; Message: string; Data: OrderLine }>('/', orderLineData);
        return response.data.Data;
    } catch (error) {
        throw new Error('Failed to create order line');
    }
};

export const updateOrderLine = async (id: number, updateData: Partial<OrderLine>): Promise<OrderLine> => {
    try {
        const response = await orderLineApi.patch<{ Success: boolean; Message: string; Data: OrderLine }>(`/${id}`, updateData);
        return response.data.Data;
    } catch (error) {
        throw new Error(`Failed to update order line with ID ${id}`);
    }
};


export const deleteOrderLineById = async (id: number): Promise<void> => {
    try {
        await orderLineApi.delete<{ Success: boolean; Message: string }>(`/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete order line with ID ${id}`);
    }
};
