import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{ position: "relative" }}>
          <img
            src="https://www.journal-theme.com/1/image/cache/catalog/journal3/slider/demo1/s1-1920x900h.png.webp"
            alt=""
          />
          <Box sx={{ position: "absolute", bottom: "4rem" }}>
            <Typography variant="h5" pb={2} sx={{ width: 300 }}>
              BAGPACKS FOR YOU NEXT ADVENTURE
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/product");
              }}
            >
              Order online
            </Button>
          </Box>
        </SwiperSlide>
        <SwiperSlide style={{ position: "relative" }}>
          <img
            src="https://www.journal-theme.com/1/image/cache/catalog/journal3/slider/demo1/s1-1920x900h.png.webp"
            alt=""
          />
          <Box sx={{ position: "absolute", bottom: "4rem" }}>
            <Typography variant="h5" pb={2} sx={{ width: 300 }}>
              BAGPACKS FOR YOU NEXT ADVENTURE
            </Typography>
            <Button variant="contained" color="secondary">
              Order online
            </Button>
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Slider;
