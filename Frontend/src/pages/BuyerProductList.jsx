import { Box, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import NoProductFound from "../components/NoProductFound";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";

const BuyerProductList = () => {
  // fetching redux data
  const { searchText, category } = useSelector((state) => state.product);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list", currentPage, searchText, category],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 8,
        searchText,
        category: category || null,
      });
    },
  });

  //   header bata  producl list leuna lai
  const productList = data?.data?.productList;

  // for pagination
  const numberOfPages = data?.data?.numberOfPages;

  //   loading
  if (isLoading) {
    return <Loader />;
  }
  if (productList < 1) {
    return <NoProductFound />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          // flexDirection: "column",
          width: "100%",
        }}
      >
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>

      {/* for pagination  */}
      <Stack alignItems="center" sx={{ width: "100%" }} mt="2rem">
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
