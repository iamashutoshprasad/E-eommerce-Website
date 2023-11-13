import React from 'react'
import '../style/Navbar.css'

const Navbar = ({size,setShow}) => {
  return (
    <nav>
        <div className='nav_box'>
            <span  className='my_shop'> Home</span>
            <span  className='my_shop'> Store</span>
            <span  className='my_shop'> About</span>
            <div className='cart' onClick={()=> setShow(false)}>
                <span>
                    Cart<i className='fas fa-cart-plus'></i>
                </span>
                <span>{size}</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
