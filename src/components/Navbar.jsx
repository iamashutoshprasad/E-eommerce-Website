import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import AuthContext from "./store/auth-context";

const Navbar = ({ size, setShow, setCart }) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const location = useLocation();
  const navigator = useNavigate();

  const [logoutTimer, setLogoutTimer] = useState(null);
  const [loginTime, setLoginTime] = useState(null);

  // Function to reset the timeout
  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set a new timeout for 5 minutes (300,000 milliseconds)
    const newLogoutTimer = setTimeout((size) => {
      // Logout logic here
      authCtx.logout();

      navigator("/");
    }, 300000);

    setLogoutTimer(newLogoutTimer);
  };

  // UseEffect to reset the timer on user login
  useEffect(() => {
    if (isLoggedIn) {
      setLoginTime(new Date().getTime());
      resetLogoutTimer();

      // Add event listeners for user activity
      const activityHandler = () => {
        setLoginTime(new Date().getTime());
        resetLogoutTimer();
      };

      document.addEventListener("mousemove", activityHandler);
      document.addEventListener("keydown", activityHandler);

      return () => {
        // Clean up the event listeners when the component unmounts
        document.removeEventListener("mousemove", activityHandler);
        document.removeEventListener("keydown", activityHandler);
      };
    }
  }, [isLoggedIn, navigator]);

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
      setCart([]);

      alert("Logged out");
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

        <Link to="/cart">
          <div
            className="cart  font-light  m-4 "
            onClick={() => setShow(false)}
          >
            <span>
              Cart
              <i className=" text-sm  "></i>
            </span>
            <span>{size}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
