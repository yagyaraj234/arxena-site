import React from "react";
import LogoHeader from "../components/LogoHeader";
import Input from "../components/Input";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import Testimonial from "../components/Testimonial";

const Signup = () => {
  return (
    <div className="flex max-sm:flex-col max-sm:gap-2">
      <div className="flex flex-col w-full sm:w-[68%]">
        <LogoHeader />
        <form
          style={{ "box-shadow": "3px 10px 34px -6px rgba(0,0,0,0.15)" }}
          className="bg-white   flex flex-col gap-6  mx-auto sm:px-14 px-4 items-center sm:py-8 py-4 sm:w-[58%] rounded-md"
        >
          <p className="text-xl font-thin text-center">
            Get started with 10 free org-chart credits. No credit card is
            needed.
          </p>
          <Input type="text" placeholder="Full Name" name="name" />

          <Input type="text" placeholder="Mobile Number" name="phone" />
          <Input type="text" placeholder="Business Email" name="email" />
          <Input type="text" placeholder="Password" name="password" />
          <Button>Create account</Button>

          <p className="text-gray-300">
            Already registered?{" "}
            <NavLink to="/login" className="underline decoration-dashed ">
              Login here
            </NavLink>
          </p>
          <p className="text-gray-300">
            <span className="underline decoration-dashed">Account lock</span>:
            We discourage licence sharing. Your account will be accessible from
            this device only
          </p>
        </form>
      </div>
      <div className="sm:w-[32%]">
        <Testimonial />
      </div>
    </div>
  );
};

export default Signup;
