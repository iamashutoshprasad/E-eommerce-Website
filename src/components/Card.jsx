import React from "react";
import { Link } from "react-router-dom";
import "../style/Card.css";

const Card = ({ item, handleClick }) => {
  const { id, title, author, price, img, amount } = item;

  return (
    <div className="cards">
      <div className="image_box">
        <img src={img} alt="image" />
      </div>
      <div className="details">
        <p>{title}</p>
        <p>{author}</p>
        <p> Price - Rs {price}</p>

        <button onClick={() => handleClick(item)}>Add to Cart</button>

        {/* Add Link to navigate to the product page with properly encoded parameters */}
        <Link
          to={`/product/${id}/${encodeURIComponent(title)}/${encodeURIComponent(
            author
          )}/${price}/${encodeURIComponent(img)}/${amount}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
