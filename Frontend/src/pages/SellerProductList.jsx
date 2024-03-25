import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";
import { useSelector } from "react-redux";

const SellerProductList = () => {
  // using redux for searching
  // const searchText = useSelector((state) => state.product);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const goToAddProduct = () => {
    navigate("/add-product");
  };

  const { isLoading, data } = useQuery({
    queryKey: ["seller-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 8,
        // searchText,
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
        sx={{
          marginBottom: "1rem",
          width: { xs: "100%", md: "200px", sm: "300px" },
        }}
      >
        Add Product
      </Button>

      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      {/* for pagination  */}
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
