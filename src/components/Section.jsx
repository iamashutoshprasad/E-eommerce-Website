import React from "react";
import "../style/Section.css";

const Section = () => {
  return (
    <div className="bg-black w-screen h-24  outline outline-white drop-shadow-lg overflow-hidden ">
      <img
        src="https://www.eminem.net/wp-content/uploads/eminem-logo-2013-white-1200x298.png.webp"
        alt="eminem_logo"
        className="w-full h-24 object-contain "
      />
    </div>
  );
};

export default Section;
