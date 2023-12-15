import React from "react";
import { mananImg, quote1, quote } from "../assets/img";

const Testimonial = () => {
  return (
    <div className="signup_lateral w-full h-screen flex flex-col items-center justify-center p-10 ">
      <img src={mananImg} alt="img" className="rounded-full h-36" />
      <div className="flex flex-col  w-full items-between justify-between gap-4 relative">
        <img src={quote} alt="img" className="h-8 w-8 absolute " />
        <p className="font-italic text-[17px] my-2 mt-10">
          Arxena helps me map with large F100 accounts saving me hours of manual
          work for resourcing projects.
        </p>
        <p>
          <span className="font-semibold">Mannan Pacha</span> | Manager - Ernst
          & Young
        </p>
        <img
          src={quote1}
          alt="img"
          className="h-8 w-8 absolute right-0 top-48"
        />
      </div>
    </div>
  );
};

export default Testimonial;
