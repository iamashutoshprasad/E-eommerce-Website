import React, { useContext, useState, useEffect } from "react";
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
import AuthForm from "./components/Login-pages/AuthForm";
import AuthContext from "./components/store/auth-context";

const App = () => {
  const [cart, setCart] = useState([]);

  const [show, setShow] = useState(true);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  // Retrieve cart data from Firestore on login
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `https://contact-us-b856a-default-rtdb.asia-southeast1.firebasedatabase.app/data/cartdetails.json`
        );
        const data = await response.json();
        if (data) {
          const cartItems = Object.values(data);
          setCart(cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn, setCart]);

  const handleClick = (item) => {
    let isPresent = false;
    // console.log(isLoggedIn);
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (!isPresent) {
      fetch(
        "https://contact-us-b856a-default-rtdb.asia-southeast1.firebasedatabase.app/data/cartdetails.json",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        },
        console.log(item)
      );
    }

    if (isPresent) {
      alert("item already added to cart");
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
    // localStorage.setItem(item, JSON.stringify([...tempArr]));
  };

  return (
    <Router>
      <div>
        <Navbar size={cart.length} setShow={setShow} setCart={setCart} />
        <Section />

        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Shop handleClick={handleClick} />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    setCart={setCart}
                    handleChange={handleChange}
                  />
                }
              />

              <Route
                path="/product/:id/:title/:author/:price/:img/:amount"
                element={<Product handleClick={handleClick} />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
            </>
          ) : (
            <>
              <Route path="/" element={<AuthForm />} />
              <Route path="*" element={<AuthForm />} />
            </>
          )}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
