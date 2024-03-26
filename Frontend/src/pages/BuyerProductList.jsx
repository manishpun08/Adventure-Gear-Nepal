import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import NoProductFound from "../components/NoProductFound";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import { clearProductFilter } from "../store/slices/productSlice";

import $axios from "../lib/axios.instance";

const BuyerProductList = () => {
  const dispatch = useDispatch();
  // fetching redux data
  const { searchText, category, minPrice, maxPrice, isFilterApplied } =
    useSelector((state) => state.product);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data } = useQuery({
    queryKey: [
      "buyer-product-list",
      currentPage,
      searchText,
      category,
      minPrice,
      maxPrice,
      isFilterApplied,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 8,
        searchText,
        category: category ? category : null,
        minPrice,
        maxPrice,
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
  // if product list doesnot match then throw no product is found
  if (productList < 1) {
    return (
      <>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(clearProductFilter())}
        >
          clear filter
        </Button>
        <NoProductFound />
      </>
    );
  }
  return (
    <>
      <ProductFilter />
      {isFilterApplied && (
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(clearProductFilter())}
        >
          clear filter
        </Button>
      )}

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
