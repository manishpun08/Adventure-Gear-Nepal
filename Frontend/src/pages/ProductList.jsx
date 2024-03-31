import { Box, Container } from "@mui/material";
import React from "react";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <Container sx={{ marginTop: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userRole === "buyer" ? <BuyerProductList /> : <SellerProductList />}
        </Box>
      </Container>
    </>
  );
};

export default ProductList;
