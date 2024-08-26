import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrder } from "../api/orderapi";
import { Order as OrderType } from "../interfaces/Order";

const AllOrder: React.FC = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingOrder, setEditingOrder] = useState<OrderType | null>(null);
    const [newAddress, setNewAddress] = useState("");

  
    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

   
    const handleDelete = async (orderId: number) => {
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order.OrderId !== orderId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdate = async (orderId: number) => {
        if (newAddress.trim() === "") {
            alert("Please enter a new address.");
            return;
        }
        try {
            
            await updateOrder(orderId, { DeliveryAddress: newAddress });
           
            setOrders(orders.map(order => 
                order.OrderId === orderId 
                ? { ...order, DeliveryAddress: newAddress } 
                : order
            ));
         
            setEditingOrder(null);
            setNewAddress("");
        } catch (err: any) {
            setError(err.message || "Failed to update order.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4 mb-5">
            <h4>Order List</h4>
            {orders.length < 1 ? (
                <p>No orders found.</p>
            ) : (
                <>
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Delivery Address</th>
                                <th>Status</th>
                                <th>Total Amount</th>
                                <th>Order Lines</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.OrderId}>
                                    <td>{index + 1}</td>
                                    <td>{order.OrderId}</td>
                                    <td>{order.CustomerId}</td>
                                    <td>{order.DeliveryAddress}</td>
                                    <td>{order.Status ? "Created" : "Pending"}</td>
                                    <td>₹{order.TotalAmount}</td>
                                    <td>
                                        <ul>
                                            {order.OrderLines.map(line => (
                                                <li key={line.OrderLineId}>
                                                    Pizza ID: {line.PizzaId}, <br />
                                                    Size: {line.Size}, <br />
                                                    Quantity: {line.Quantity}, <br />
                                                    Total: ₹{line.TotalAmount}<br />
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm me-2" 
                                            onClick={() => handleDelete(order.OrderId)}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                setEditingOrder(order);
                                                setNewAddress(order.DeliveryAddress); 
                                            }}
                                        >
                                            Update Address
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {editingOrder && (
                        <div className="mt-4">
                            <h5>Update Address for Order ID: {editingOrder.OrderId}</h5>
                            <input 
                                type="text" 
                                value={newAddress} 
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="form-control mb-2"
                                placeholder="Enter new address"
                            />
                            <button 
                                className="btn btn-primary" 
                                onClick={() => handleUpdate(editingOrder.OrderId)}
                            >
                                Save Changes
                            </button>
                            <button 
                                className="btn btn-secondary ms-2" 
                                onClick={() => setEditingOrder(null)}
                            >
                                Cancel
                            </button>
                            <br /><br /><br />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllOrder;
