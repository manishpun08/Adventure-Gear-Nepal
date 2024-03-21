import { Grid } from "@mui/material";
import React from "react";
import Slider from "../components/Slider";
import SliderRight from "../components/SliderRight";

const Home = () => {
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={8}>
          <Slider />
        </Grid>
        <Grid item xs={12} md={3.7}>
          <SliderRight />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
