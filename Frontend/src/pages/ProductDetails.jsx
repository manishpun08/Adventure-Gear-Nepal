import {
  Container,
  Grid,
  Typography
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductDescription from "../components/ProductDescription";
import ProductImage from "../components/ProductImage";
import { fallbackImage } from "../constant/general.constant";
import { getProductDetails } from "../lib/apis";

const ProductDetails = () => {
  const params = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: () => {
      return getProductDetails(params?.id);
    },
  });

  const productDetails = data?.data?.productDetails;

  //   is loading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Container sx={{ marginTop: "2rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            paddingBottom: "1rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          {productDetails?.name}
        </Typography>

        <Grid container justifyContent="space-between">
          <Grid
            item
            md={5}
            xs={12}
            sx={{
              border: "1px solid #ddd",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <ProductImage imageUrl={productDetails?.image || fallbackImage} />
          </Grid>

          <Grid item md={6} xs={12}>
            <ProductDescription {...productDetails} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetails;
