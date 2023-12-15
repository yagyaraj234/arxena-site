import React from "react";

const Input = ({ placeholder, name, type }) => {
  return <input type={type} placeholder={placeholder} name={name} className="border p-1.5 border-gray-300 rounded-md w-full" />;
};

export default Input;
