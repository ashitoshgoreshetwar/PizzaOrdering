import axios from 'axios';
import { Customer } from '../interfaces/Customer';
const custapi = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 10000
});

export const addCustomer = async (newCustomer: Omit<Customer, 'CustomerId'>): Promise<Customer> => {
    try {
        const response = await custapi.post<{ Data: Customer }>('/customers', newCustomer);
        return response.data.Data;
    } catch (error) {
        throw new Error('Failed to add customer');
    }
};

export const getCustomers = async () => {
    try {
        const response = await custapi.get<{ Success: boolean; Message: string; Data: Customer[] }>('/customers');
        return response.data.Data;
    } catch (error) {
        throw new Error('Failed to fetch customers');
    }
};

export const deleteCustomerById = async (customerId: number): Promise<void> => {
    try {
        await custapi.delete(`/customers/${customerId}`);
    } catch (error) {
        throw new Error(`Failed to delete customer with ID ${customerId}`);
    }
};

export const updateCustomerById = async (customerId: number, updatedCustomer: Customer): Promise<Customer> => {
    try {
        const response = await custapi.patch<{Data: Customer}>(`/customers/${customerId}`, updatedCustomer);
        return response.data.Data;
    } catch (error) {
        throw new Error(`Failed to update customer with ID ${customerId}`);
    }
};