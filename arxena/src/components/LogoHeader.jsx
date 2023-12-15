import React from "react";
import { Logo } from "../assets/img";
import { NavLink } from "react-router-dom";
const LogoHeader = () => {
  return (
    <div className="flex  p-5">
      <NavLink to="/">
        <img src={Logo} alt="logo" className="h-14" />
      </NavLink>
    </div>
  );
};

export default LogoHeader;
