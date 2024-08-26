import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Pizza } from '../interfaces/Pizza';
import { OrderLine } from '../interfaces/OrderLine';
import { addOrder } from '../api/orderapi';
import { createOrderLine } from '../api/orderlineapi';
import { getCustomers } from '../api/customerapi';
import { Customer } from '../interfaces/Customer';

interface CartItem {
    pizza: Pizza;
    quantity: number;
    size: string;
    TotalAmount: number;
}

const Checkout: React.FC = () => {
    const location = useLocation();
    const cartItems = location.state?.cartItems as CartItem[] || [];
    const [showModal, setShowModal] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customerList = await getCustomers();
                setCustomers(customerList);
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const getTotal = () => {
        const total = cartItems.reduce((total, item) =>
            total + (item.pizza[item.size + 'SizePrice'] as number) * item.quantity, 0);
        localStorage.setItem('totalAmount', total.toString()); 
        return total;
    };

    const handlePlaceOrder = () => {
        setShowCustomerDropdown(true);
    };

    const handleCustomerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const customerId = parseInt(event.target.value);
        setSelectedCustomerId(customerId);
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryAddress(event.target.value);
    };

    const handleConfirmOrder = async () => {
        if (!selectedCustomerId) {
            alert('Please select a customer.');
            return;
        }
    
        if (!deliveryAddress.trim()) {
            alert('Please enter a delivery address.');
            return;
        }
    
       
        const totalAmount = parseFloat(localStorage.getItem('totalAmount') || '0');
    
     
        const orderData = {
            CustomerId: selectedCustomerId,
            DeliveryAddress: deliveryAddress,
            TotalAmount: totalAmount, 
            Status: true,
            OrderLines: cartItems.map(item => ({
                PizzaId: item.pizza.PizzaId,
                Size: item.size,
                Quantity: item.quantity,
                TotalAmount: (item.pizza[item.size + 'SizePrice'] as number) * item.quantity
            })) as OrderLine[]
        };
    
        try {
            // 1. create the order and get the order ID
            const orderResponse = await addOrder(orderData);
            const orderId = orderResponse.OrderId;
            console.log("Order ID from the backend:", orderId);
            
            // 2. Loop through each order line and call `createOrderLine` to create it in the backend
            for (const orderLine of orderData.OrderLines) {
                const orderLineData = {
                    OrderId: orderId,
                    PizzaId: orderLine.PizzaId,
                    Size: orderLine.Size,
                    Quantity: orderLine.Quantity,
                    TotalAmount: orderLine.TotalAmount
                };
                await createOrderLine(orderLineData);
                console.log("Created order line:", orderLineData);
            }
    
            // Show the confirmation modal after successfully placing the order
            setShowModal(true);
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    
        // Clear the total amount from local storage
        localStorage.removeItem('totalAmount');
        
        // Redirect to the All Orders page after placing the order
        navigate('/AllOrders');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/AllOrders'); // Redirect to AllOrders page
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            {cartItems.length === 0 && <div>Your cart is empty</div>}
            {cartItems.map((item, index) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Title>{item.pizza.Name}</Card.Title>
                        <Card.Text>
                            Quantity: {item.quantity}
                            <br />
                            Size: {item.size}
                            <br />
                            Price: ₹{(item.pizza[item.size + 'SizePrice'] as number) * item.quantity}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            <h3>Total: ₹{getTotal()}</h3>
            <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>

            {showCustomerDropdown && (
                <Form.Group controlId="customerSelect" className="mt-4">
                    <Form.Label>Select Customer</Form.Label>
                    <Form.Select onChange={handleCustomerSelect} style={{ width: "30%" }}>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer.CustomerId} value={customer.CustomerId}>
                                {customer.FirstName} {customer.LastName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label className="mt-3">Delivery Address</Form.Label>
                    <Form.Control
                        type="text"
                        style={{ width: "30%" }}
                        value={deliveryAddress}
                        onChange={handleAddressChange}
                        placeholder="Enter delivery address"
                    />
                    <Button variant="primary" className="mt-3" onClick={handleConfirmOrder}>Confirm Order</Button>
                </Form.Group>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Placed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order has been placed successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Checkout;
