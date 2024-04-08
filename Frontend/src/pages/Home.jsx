import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductSlider from "../components/LatestProduct";
// import SliderHome from "../components/SliderHome";
const SliderHome = React.lazy(() => import("../components/SliderHome"));

const Home = () => {
  return (
    <>
      <SliderHome />
      <ProductSlider />
      <Banner />
      <Category />
    </>
  );
};

export default Home;
