import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Pizza } from '../interfaces/Pizza';

interface CartItem {
  pizza: Pizza;
  quantity: number;
  size: string;
  crust: string;
}

const CartSidebar: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.pizza[item.size + 'SizePrice'] as number) * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <div className="cart-sidebar">
      <Card>
        <Card.Body>
          <Card.Title>Cart</Card.Title>
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
                  Crust: {item.crust}
                  <br />
                  Price: ₹{(item.pizza[item.size + 'SizePrice'] as number) * item.quantity}
                </Card.Text>
                <Button variant="danger" onClick={() => removeFromCart(index)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Card.Footer>
            <h5>Total: ₹{getTotal()}</h5>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartSidebar;
