import { useState, useRef, useContext } from "react";

import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(authCtx.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJUlKHH-3MX6X_M4qQDHpdZFv3kTXgwzo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJUlKHH-3MX6X_M4qQDHpdZFv3kTXgwzo";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          alert("Login");
          navigate("/shop");

          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-6">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form
        onSubmit={submitHandler}
        className="max-w-full p-4 bg-white rounded-md shadow-md outline-1 mb-4"
      >
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 font-bold">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-bold">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className="w-full px-4 py-2 border mb-4 rounded-md"
          />
        </div>
        <div className=" flex flex-col gap-8">
          {!isLoading && (
            <button className=" bg-black text-base px-3 py-2 text-white rounded-lg flex-row  hover:bg-slate-700  ">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className="bg-black text-base px-3 py-2 text-white rounded-lg flex-row  hover:bg-slate-700 "
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
