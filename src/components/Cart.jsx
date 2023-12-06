import React, { useContext, useEffect, useState } from "react";
// import firebase from "firebase/app"; // Import firebase
// import "firebase/firestore"; // Import Firestore
import "../style/cart.css";
import AuthContext from "./store/auth-context";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const authCtx = useContext(AuthContext);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    // updateCartInFirestore(updatedCart);
    fetch(
      "https://contact-us-b856a-default-rtdb.asia-southeast1.firebasedatabase.app/data/cartdetails.json",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      },
      console.log(id)
    );
  };

  const handlePrice = () => {
    let ans = 0;
    cart.forEach((item) => {
      ans += item.amount * item.price;
    });
    setPrice(ans);
  };

  // const updateCartInFirestore = (updatedCart) => {
  //   const userId = authCtx.token;

  //   if (userId) {
  //     const db = firebase.firestore();
  //     db.collection("carts").doc(userId).set({ cart: updatedCart });
  //   }
  // };

  useEffect(() => {
    if (cart) {
      handlePrice();
    }
  }, [cart]);

  return (
    <article>
      {cart?.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
          <div>
            <button
              className="bg-black text-white rounded    font-black mx-2 px-2"
              onClick={() => {
                handleChange(item, +1);
              }}
            >
              +
            </button>
            {item.amount}
            <button
              className="bg-black text-white rounded  font-black mx-2 px-2"
              onClick={() => {
                handleChange(item, -1);
              }}
            >
              -
            </button>
          </div>
          <div>
            <span>{item.price}</span>
            <button
              className="bg-black text-white rounded p-2  font-black mx-4"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span> Rs - {price}</span>
      </div>
    </article>
  );
};

export default Cart;
