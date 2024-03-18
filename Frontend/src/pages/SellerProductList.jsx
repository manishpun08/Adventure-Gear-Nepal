import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";

const SellerProductList = () => {
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const goToAddProduct = () => {
    navigate("/add-product");
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.productList;
  // for pagination
  const numberOfPages = data?.data?.numberOfPages;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        onClick={goToAddProduct}
        sx={{ marginBottom: "2rem" }}
      >
        Add Product
      </Button>
      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Stack alignItems="center" mt="2rem">
        <Pagination
          count={numberOfPages}
          page={currentPage}
          color="secondary"
          onChange={(_, page) => {
            setCurrentPage(page);
          }}
        />
      </Stack>
    </Box>
  );
};

export default SellerProductList;
