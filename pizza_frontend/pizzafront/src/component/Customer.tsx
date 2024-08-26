import React, { useEffect, useState } from 'react';
import { deleteCustomerById, getCustomers, updateCustomerById } from '../api/customerapi';
import { Customer as CustomerType } from '../interfaces/Customer';

const Customer: React.FC = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingCustomer, setEditingCustomer] = useState<CustomerType | null>(null);

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (customerId: number) => {
        try {
            await deleteCustomerById(customerId);
            setCustomers(customers.filter(customer => customer.CustomerId !== customerId));
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        console.log('Deleted customer with ID:', customerId);
    };

    const handleUpdate = (customer: CustomerType) => {
        setEditingCustomer(customer);
    };

    const handleSaveUpdate = async (updatedCustomer: CustomerType) => {
        try {
            await updateCustomerById(updatedCustomer.CustomerId, updatedCustomer);
            setEditingCustomer(null); 
            await fetchCustomers(); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4 mb-5">
            <h4>Customer List</h4>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={customer.CustomerId}>
                            <td>{index + 1}</td>
                            <td>{customer.FirstName}</td>
                            <td>{customer.LastName}</td>
                            <td>{customer.EmailAddress}</td>
                            <td>{customer.Address}</td>
                            <td>{customer.PhoneNumber}</td>
                            <td>
                                <button 
                                    className="btn btn-primary btn-sm mr-2" 
                                    onClick={() => handleUpdate(customer)}
                                >
                                    Update
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDelete(customer.CustomerId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingCustomer && (
                <div>
                    <h4>Edit Customer</h4>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveUpdate(editingCustomer);
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="firstName" 
                                value={editingCustomer.FirstName}
                                onChange={(e) => setEditingCustomer({...editingCustomer, FirstName: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="lastName" 
                                value={editingCustomer.LastName}
                                onChange={(e) => setEditingCustomer({...editingCustomer, LastName: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                value={editingCustomer.EmailAddress}
                                onChange={(e) => setEditingCustomer({...editingCustomer, EmailAddress: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address" 
                                value={editingCustomer.Address}
                                onChange={(e) => setEditingCustomer({...editingCustomer, Address: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="phone" 
                                value={editingCustomer.PhoneNumber}
                                onChange={(e) => setEditingCustomer({...editingCustomer, PhoneNumber: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>

                    </form>
                </div>
            )}
        </div>
    );
};

export default Customer;
