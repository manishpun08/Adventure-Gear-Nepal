import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";

const BuyerProductList = () => {
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 4,
      });
    },
  });

  //   header bata  producl list leuna lai
  const productList = data?.data?.productList;

  // for pagination
  const numberOfPages = data?.data?.numberOfPages;

  //   loading
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
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
    </>
  );
};

export default BuyerProductList;
