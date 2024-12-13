import React from "react";
import Loading from "../../../assets/ETHLOGO1.gif";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={Loading} alt="Loading...." />
    </div>
  );
};

export default Loader;
