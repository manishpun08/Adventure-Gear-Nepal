import React from "react";
import ProductSlider from "../components/LatestProduct";
// import SliderHome from "../components/SliderHome";
const SliderHome = React.lazy(() => import("../components/SliderHome"));

const Home = () => {
  return (
    <>
      <SliderHome />
      <ProductSlider />
    </>
  );
};

export default Home;
