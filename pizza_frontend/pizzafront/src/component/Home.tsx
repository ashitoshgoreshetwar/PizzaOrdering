import React, { useEffect, useState } from 'react';
import { getPizzas } from '../api/pizzaApi';
import { Pizza } from '../interfaces/Pizza';
import PizzaCard from '../component/PizzaCard';
import CartSidebar from '../component/CartSidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        setError('Failed to load pizzas.');
        setPizzas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza: Pizza, quantity: number, size: string, crust: string) => {
    addToCart(pizza, quantity, size, crust);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <br />
      <Row>
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <Col key={pizza.PizzaId} sm={12} md={6} lg={4} className="mb-4">
              <PizzaCard pizza={pizza} onAddToCart={handleAddToCart} />
            </Col>
          ))
        ) : (
          <div>No pizzas found</div>
        )}
      </Row>
      <CartSidebar /> 
    </Container>
  );
};

export default Home;
