import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Linkedin,
  Facebook,
  Youtube,
  TwitterLogo,
} from "../../assets/img/index";
const Footer = () => {
  return (
    <div className="flex max-sm:flex-col max-sm:items-center justify-between py-4 ">
      <div className="flex flex-col max-sm:text-center">
        <p>OrgGPT - Talent Identification Software for Ambitious Companies</p>

        <div className="flex gap-2 flex-wrap max-sm:my-4 max-sm:justify-center">
          <NavLink className={`text-lightblue `}>Pricing</NavLink>
          <p>|</p>
          <NavLink className={`text-lightblue `}>Terms of Service</NavLink>
          <p>|</p>
          <NavLink className={`text-lightblue `}>Privacy Policy</NavLink>
          <p>|</p>
          <NavLink className={`text-lightblue `}>How to Use</NavLink>
          <p>|</p>
          <NavLink className={`text-lightblue `}>Download Extension</NavLink>
        </div>
      </div>
      <div className="flex sm:gap-5 gap-1">
        <Link href="https://twitter.com/arxsenainc">
          <img className="h-10" src={Linkedin} alt="linkedin logo" />
        </Link>
        <Link href="https://twitter.com/arxsenainc">
          <img className="h-10" src={TwitterLogo} alt=" logo" />
        </Link>
        <Link href="https://twitter.com/arxsenainc">
          <img className="h-10" src={Facebook} alt=" logo" />
        </Link>
        <Link href="https://twitter.com/arxsenainc">
          <img className="h-10" src={Youtube} alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
