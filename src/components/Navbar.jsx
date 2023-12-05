import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import AuthContext from "./store/auth-context";

const Navbar = ({ size, setShow }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const location = useLocation();
  const navigator = useNavigate();
  // const showCartHandler = () => {
  //   if (isLoggedIn) {
  //     setShow(false);
  //   }
  // };
  const loginHandler = () => {
    if (!isLoggedIn) {
      navigator("/");
    } else {
      alert("Already Logged In");
    }
  };
  const logoutHandler = () => {
    if (isLoggedIn) {
      authCtx.logout();
      alert("loggeout");
    }
  };

  return (
    <nav>
      <div className="nav_box">
        <Link
          to="/home"
          className={
            location.pathname === "/Pages/Home" ? "my_shop active" : "my_shop"
          }
        >
          Home
        </Link>
        <Link
          to=""
          className={location.pathname === "/" ? "my_shop active" : "my_shop"}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className={
            location.pathname === "/Pages/About" ? "my_shop active" : "my_shop"
          }
        >
          About
        </Link>
        <Link
          to="/contactus"
          className={
            location.pathname === "/Pages/ContactUs"
              ? "my_shop active"
              : "my_shop"
          }
        >
          Contact Us
        </Link>
        <Link
          to="/auth"
          className={
            location.pathname === "/Login-pages/AuthForm"
              ? "my_shop active"
              : "my_shop"
          }
        >
          {!isLoggedIn && <button onClick={loginHandler}>Login</button>}

          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </Link>

        <div className="cart" onClick={() => setShow(false)}>
          <span>
            Cart<i className="fas fa-cart-plus"></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
