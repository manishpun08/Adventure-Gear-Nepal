import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fallbackImage } from "../constant/general.constant";
import $axios from "../lib/axios.instance";
import Loader from "./Loader";

const LatestProduct = (props) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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

  const { isLoading, data } = useQuery({
    queryKey: ["latest-product"],
    queryFn: async () => {
      return await $axios.get("/product/list/latest");
    },
  });
  // data fetching
  const latestProducts = data?.data?.latestProducts;
  //  if loading show loader
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Container sx={{ marginTop: "3rem" }}>
        <Typography variant="h5" textAlign="center" fontWeight="800">
          LATEST PRODUCT
        </Typography>

        <Box>
          <Slider {...settings}>
            {latestProducts?.map((item) => {
              return (
                <Card
                  key={item._id}
                  sx={{
                    margin: "1rem 0",
                    maxWidth: 270,
                    maxHeight: 350,
                    width: { xs: "100%", md: "23.9%", sm: "40%" },
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                  }}
                >
                  <img
                    onClick={() => {
                      navigate(`/productDetails/${item._id}`);
                    }}
                    alt={props.name}
                    src={item.image || fallbackImage}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      marginTop: "7px",
                      cursor: "pointer",
                    }}
                  />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body"
                      alignItems="center"
                      sx={{
                        fontWeight: "700",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.name}
                      <Chip label={item.brand} />
                    </Typography>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontWeight="600">${item.price}</Typography>

                      <Typography fontWeight="600">5% OFF</Typography>
                    </Stack>
                  </CardContent>

                  <CardActions>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate(`/productDetails/${item._id}`);
                      }}
                    >
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Slider>
        </Box>
      </Container>
    </>
  );
};

export default LatestProduct;
