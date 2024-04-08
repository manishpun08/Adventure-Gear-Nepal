import { Box, Button, Card, CardActions, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import $axios from "../lib/axios.instance";

const Category = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["category"],
    queryFn: async (values) => {
      return await $axios.get("/product/category/list", values);
    },
  });

  const uniqueCategories = data?.data?.uniqueCategories;

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "black",
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          color: "black",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box
        className="slider-container"
        style={{ background: "", padding: "2rem" }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="800">
          CATEGORIES
        </Typography>

        <Slider {...settings}>
          {uniqueCategories?.map((item) => {
            return (
              <Card
                marginTop="1rem"
                className="slider"
                key={item._id}
                sx={{ maxWidth: 245, height: "100%", background: "" }}
              >
                <img
                  onClick={() => {
                    navigate(`/category/list/${item._id}`);
                  }}
                  src={item.image}
                  alt="Image"
                  width="100%"
                  height="200px"
                  style={{ cursor: "pointer", background: "", padding: "1rem" }}
                />

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    onClick={() => {
                      navigate(`/category/list/${item._id}`);
                    }}
                  >
                    {item.category}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Slider>
      </Box>
    </>
  );
};

export default Category;
