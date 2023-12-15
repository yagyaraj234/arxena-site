import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex gap-4 justify-end py-4">
      <NavLink
        to="/signup"
        className={`bg-lightblue text-white p-2.5 px-12 rounded-full font-semibold text-lg `}
      >
        Sign up
      </NavLink>
      <NavLink
        to="/login"
        className={`border-lightblue border p-2.5 px-12 rounded-full font-semibold text-lightblue text-lg `}
      >
        Log in
      </NavLink>
    </div>
  );
};

export default Navbar;
