import React from "react";
import { useParams } from "react-router-dom";

const Product = ({ handleClick }) => {
  const { id, title, author, price, img, amount } = useParams();

  return (
    <div>
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>Price: ${price}</p>
      <img src={img} alt={title} />
      <p>Amount: {amount}</p>
      {/* Add other product details */}
      <button
        onClick={() => handleClick({ id, title, author, price, img, amount })}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
