import { Box } from "@mui/material";
import React from "react";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";
// import ProductFilter from "../components/ProductFilter";
import { useDispatch } from "react-redux";
// import { clearFilter } from "../store/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* <ProductFilter sx={{ minHeight: "20px" }} />
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            dispatch(clearFilter());
          }}
        >
          Clear Filter
        </Button> */}
        {userRole === "buyer" ? <BuyerProductList /> : <SellerProductList />}
      </Box>
    </>
  );
};

export default ProductList;
