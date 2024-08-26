import React from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (

        <>

            <div className="container-fluid navbars">

                <ul className="nav" style={{ borderRadius: '50px', minHeight: '50px', backgroundColor: '#0066A7' }}>

                    <li className="nav-item" style={{ lineHeight: '50px', }}>
                        <Link to="/" className="nav-link text-white fw-bold" style={{ border: '3px solid white', borderRadius: '50px', backgroundColor: '#0066A7' }}>
                            Domino's Hut
                        </Link>
                    </li>

                    <li className="nav-item" style={{ lineHeight: '50px', marginLeft: '400px' }}>
                        <Link to="/" className="nav-link text-white" >PIZZAS</Link>
                    </li>

                    <li className="nav-item" style={{ lineHeight: '50px' }}>
                        <Link to="/AllOrders" className="nav-link text-white" >ORDERS</Link>

                    </li>


                    <li className="nav-item" style={{ lineHeight: '50px' }}>
                        <Link to="/addcustomer" className="nav-link text-white" >ADD CUSTOMER</Link>
                    </li>

                    <li className="nav-item" style={{ lineHeight: '50px' }}>
                        <Link to="/CustomersList" className="nav-link text-white" >VIEW CUSTOMER</Link>
                    </li>

                    <li className="nav-item" style={{ lineHeight: '50px' }}>
                        <Link to="/addpizza" className="nav-link text-white" >ADD PIZZA</Link>

                    </li>

                    <li className="nav-item" style={{ lineHeight: '50px' }}>
                        <Link to="/viewpizza" className="nav-link text-white" > VIEW PIZZA</Link>

                    </li>
                </ul>
            </div>

        </>
    );
};

export default Navbar;
