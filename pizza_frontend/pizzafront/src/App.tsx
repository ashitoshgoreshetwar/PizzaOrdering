import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Checkout from './pages/Checkout';
import Footer from './component/Footer';
import './index.css'
import Order from './component/AllOrder';
import Customer from './component/Customer';
import AddPizza from './component/AddPizza';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewAllPizza from './component/ViewAllPizza';
import AddCustomer from './component/AddCustomer';


const App: React.FC = () => {
  return (
    <>
    
      <Navbar />
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/AllOrders" element={<Order/>}></Route>
          <Route path="/CustomersList" element={<Customer/>}></Route>/
          <Route path="/addpizza" element={<AddPizza/>}></Route>
          <Route path="/viewpizza" element={<ViewAllPizza />}></Route>
          <Route path="/addcustomer" element={<AddCustomer />}></Route>
      </Routes>
      <Footer />
      
      
    </>
  );
};

export default App;
