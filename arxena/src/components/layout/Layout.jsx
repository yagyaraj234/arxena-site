import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="sm:px-6 min-h-screen  ">
      <Navbar />
      <div className="sm:min-h-[76vh] min-h-[60vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
