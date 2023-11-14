import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ size, setShow }) => {
  const location = useLocation();

  return (
    <nav>
      <div className='nav_box'>
        <Link to='/home' className={location.pathname === '/Pages/Home' ? 'my_shop active' : 'my_shop'}>
          Home
        </Link>
        <Link to='/' className={location.pathname === '/' ? 'my_shop active' : 'my_shop'}>
          Store
        </Link>
        <Link to='/about' className={location.pathname === '/Pages/About' ? 'my_shop active' : 'my_shop'}>
          About
        </Link>
        <div className='cart' onClick={() => setShow(false)}>
          <span>
            Cart<i className='fas fa-cart-plus'></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
