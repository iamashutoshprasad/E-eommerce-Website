import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: (token) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = true;
  console.log("in Auth Context :", userIsLoggedIn);
  console.log(token);
  const loginHandler = (token) => {
    setToken(token);
    // Optionally, you can set the token in localStorage as well
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
