import React from "react";
import { Link } from "react-router-dom";
import "../style/Card.css";

const Card = ({ item, handleClick }) => {
  const { id, title, author, price, img, amount } = item;

  return (
    <div className="cards  border-slate-200 mb-2 ">
      <div className="image_box ">
        <img src={img} alt="image" />
      </div>
      <div className="details mb-1 ">
        <p>{title}</p>
        <p>{author}</p>
        <p> Price - Rs {price}</p>

        <button onClick={() => handleClick(item)} className="mr-2">
          Add to Cart
        </button>

        <Link
          to={`/product/${id}/${encodeURIComponent(title)}/${encodeURIComponent(
            author
          )}/${price}/${encodeURIComponent(img)}/${amount}`}
        >
          <button className="mr-2">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
