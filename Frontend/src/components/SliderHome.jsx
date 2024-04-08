import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const banner = [
  {
    title: "Gear Up for Adventure Explore, Discover, Thrive!",
    description:
      "Gear Up for Adventure: Explore, Discover, Thrive! Dive into the world of exploration with our premium gear designed to elevate your outdoor experiences. Unleash your adventurous spirit and conquer every trail, peak, and challenge with confidence. ",

    image: "https://i.ibb.co/1KgSFjz/B-Image.png",
  },
  {
    title: "Unleash Your Adventurous Spirit – Gear Up with Us!",
    description:
      "Explore boundless possibilities with Adventure Gear Nepal. From rugged terrains to serene landscapes, we equip you for every journey. Discover quality gear, expert advice, and unparalleled service, all in one destination.",

    image: "https://i.ibb.co/HzbCg58/B-Image2.png",
  },
];

const SliderHome = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 6000,
    cssEase: "linear",
  };

  return (
    <>
      <Slider {...settings}>
        {banner.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: { xs: "100%", md: "100%", lg: "100%" },
                background: "#EEEDEB",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", md: "row" },
                  alignItems: "center",
                  flexWrap: "wrap",
                  flexGrow: "1",
                }}
              >
                <Grid item lg={6} xs={12} md={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "start",
                      marginLeft: { xs: "1rem", md: "2rem" },
                      fontSize: { xs: "24px" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    padding="0.5rem 0"
                    sx={{
                      textAlign: "justify",
                      marginLeft: { xs: "1rem", md: "2rem" },
                      paddingRight: { xs: "1rem", md: "2rem" },
                      fontSize: { xs: "14px" },
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      textAlign: "start",
                      marginLeft: { xs: "1rem", md: "2rem" },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ background: "black" }}
                      onClick={() => {
                        navigate("/product");
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Grid>
                <Grid item>
                  <img
                    src={item.image}
                    alt=""
                    width="70%"
                    style={{ margin: "auto", padding: "" }}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Slider>
    </>
  );
};

export default SliderHome;
