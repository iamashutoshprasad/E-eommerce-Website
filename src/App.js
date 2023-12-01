import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import "./App.css";
import Cart from "./components/Cart";
import Section from "./components/Section";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import ContactUs from "./components/Pages/ContactUs";
import Product from "./components/Pages/Product";
import About from "./components/Pages/About";

const App = () => {
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [show, setShow] = useState(true);

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });

    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;
    console.log(tempArr);

    if (tempArr[ind].amount === 0) {
      tempArr[ind].amount = 1;
    }
    setCart([...tempArr]);
  };

  return (
    <Router>
      <div>
        <Navbar size={cart.length} setShow={setShow} />
        <Section />
        <Routes>
          <Route
            path="/"
            element={
              show ? (
                <Shop handleClick={handleClick} />
              ) : (
                <Cart
                  cart={cart}
                  setCart={setCart}
                  handleChange={handleChange}
                />
              )
            }
          />
          // Assuming you are rendering Product in the App component
          <Route
            path="/product/:id/:title/:author/:price/:img/:amount"
            element={<Product handleClick={handleClick} />}
          />

          <Route path="/home" element={show ? <Home /> : Error} />
          <Route path="/contactus" element={show ? <ContactUs /> : Error} />
          <Route path="/about" element={show ? <About /> : Error} />
          <Route path="/cart" element={show ? <Cart /> : Error} />


        </Routes>

        {warning && (
          <div className="warning"> Item is already in your cart </div>
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
