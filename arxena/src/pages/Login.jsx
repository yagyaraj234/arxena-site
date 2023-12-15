import React from "react";
import LogoHeader from "../components/LogoHeader";
import Input from "../components/Input";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import Testimonial from "../components/Testimonial";

const Login = () => {
  return (
    <div className="flex max-sm:flex-col max-sm:gap-2">
      <div className="flex flex-col w-full sm:w-[68%]">
      <LogoHeader />
        <form style={{"box-shadow": "3px 10px 34px -6px rgba(0,0,0,0.15)"}} className="bg-white   flex flex-col gap-8  mx-auto sm:px-14 px-4 items-center sm:py-8 py-4 sm:w-[58%] rounded-md mt-10">
          <p className="text-xl font-thin">Welcome back!</p>
          <Input type="text" placeholder="Email" name="email" />
          <Input type="text" placeholder="Password" name="password" />
          <Button>Log in</Button>

          <div>
            <p className="text-gray-300">
              Forgot your password?{" "}
              <NavLink
                to="/password_reset"
                className="underline decoration-dashed "
              >
                Reset it here
              </NavLink>
            </p>
            <p className="text-gray-300">
              Need an account?{" "}
              <NavLink to="/signup" className="underline decoration-dashed ">
                Sign up for free
              </NavLink>
            </p>
          </div>
        </form>
      </div>
      <div className="sm:w-[32%]">
        <Testimonial />
      </div>
    </div>
  );
};

export default Login;
