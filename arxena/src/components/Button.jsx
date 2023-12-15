import React from "react";

const Button = ({ children }) => {
  return (
    <button
      className={`bg-lightblue text-white p-2.5 px-12 rounded-full font-semibold text-lg `}
    >
      {children}
    </button>
  );
};

export default Button;
