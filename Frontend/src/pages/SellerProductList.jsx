import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import { clearProductFilter } from "../store/slices/productSlice";
import NoProductFound from "../components/NoProductFound";

const SellerProductList = () => {
  const dispatch = useDispatch();

  // fetching redux data
  const { searchText, category, minPrice, maxPrice, isFilterApplied } =
    useSelector((state) => state.product);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const goToAddProduct = () => {
    navigate("/add-product");
  };

  const { isLoading, data } = useQuery({
    queryKey: [
      "seller-product-list",
      currentPage,
      searchText,
      category,
      minPrice,
      maxPrice,
      isFilterApplied,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 8,
        searchText,
        category: category ? category : null,
        minPrice,
        maxPrice,
      });
    },
  });

  const productList = data?.data?.productList;
  // for pagination
  const numberOfPages = data?.data?.numberOfPages;

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
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={goToAddProduct}>
          Add Product
        </Button>
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
      </Stack>

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
    </>
  );
};

export default SellerProductList;
