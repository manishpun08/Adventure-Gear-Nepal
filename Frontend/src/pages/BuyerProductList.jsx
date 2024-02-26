import { Box, CircularProgress } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import { getBuyerProducts } from "../lib/apis";

const BuyerProductList = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: "buyer-product-list",
    queryFn: async () => {
      return await getBuyerProducts();
    },
  });

  //   header bata  producl list leuna lai
  const productList = data?.data?.productList;

  //   loading
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default BuyerProductList;
