import React from "react";
import Layout from "../components/layout/Layout";
import Logo from "../assets/img/arxena-logo/arxena-logo.png";
import { upload, PoweredBy } from "../assets/img";
const Home = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center flex-col h-full gap-12 min-h-[56vh]">
        <img src={Logo} alt="logo" className="sm:h-20 h-14 mt-10" />

        <div className="rounded-full px-4 bg-gray-50 p-1.5 sm:w-5/12 w-full flex justify-between items-center border border-gray-200">
          <input
            type="text"
            name="Search"
            placeholder=" 🔍Search any company's org chart"
            className="bg-gray-50 outline-none font-thin w-full p-1.5 "
          />
          <img className="h-5 pr-3" src={upload} alt="upload" />
        </div>

        <img src={PoweredBy} alt="gpt" className="h-6" />
      </div>
    </Layout>
  );
};

export default Home;
