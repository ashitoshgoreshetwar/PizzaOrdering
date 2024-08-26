import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { PizzaCardProps } from '../interfaces/PizzaCardProps';

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [selectedCrust, setSelectedCrust] = useState<string>('New Hand Tossed');
  const [price, setPrice] = useState<number>(pizza.MediumSizePrice);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeSelect = (size: string | null) => {
    if (!size) return;

    setSelectedSize(size);

    switch (size) {
      case 'Regular':
        setPrice(pizza.RegularSizePrice);
        break;
      case 'Medium':
        setPrice(pizza.MediumSizePrice);
        break;
      case 'Large':
        setPrice(pizza.LargeSizePrice);
        break;
      default:
        setPrice(pizza.MediumSizePrice);
    }
  };

  const handleCrustSelect = (crust: string | null) => {
    if (crust) {
      setSelectedCrust(crust);
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    onAddToCart(pizza, quantity, selectedSize, selectedCrust);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pizza.ImageUrl} alt={pizza.Name} />
      <Card.Body>
        <Card.Title>₹ {price * quantity}</Card.Title>
        <Card.Text>
          <strong>{pizza.Name}</strong>
          <br />
          {pizza.Description}
        </Card.Text>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Size</span>
            <DropdownButton
              id="dropdown-size-button"
              title={selectedSize}
              variant="secondary"
              onSelect={(eventKey) => handleSizeSelect(eventKey as string)}
            >
              <Dropdown.Item eventKey="Regular">Regular</Dropdown.Item>
              <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
              <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Crust</span>
            <DropdownButton
              id="dropdown-crust-button"
              title={selectedCrust}
              variant="secondary"
              onSelect={(eventKey) => handleCrustSelect(eventKey as string)}
            >
              <Dropdown.Item eventKey="New Hand Tossed">New Hand Tossed</Dropdown.Item>
              <Dropdown.Item eventKey="Cheese Burst">Cheese Burst</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Quantity</span>
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1} 
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}>+</Button>
            </div>
          </div>
        </div>
        <Button
          variant="success"
          className="mt-2"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PizzaCard;
