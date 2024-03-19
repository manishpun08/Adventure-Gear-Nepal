import React from "react";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";
import { Box, Button, Grid } from "@mui/material";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import NoCartItem from "../components/NoCartItem";
import Loader from "../components/Loader";

const Cart = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-items"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartItem = data?.data?.cartItem;
  const orderSummary = data?.data?.orderSummary;

  if (isLoading) {
    return <Loader />;
  }

  if (cartItem?.length < 1) {
    return <NoCartItem />;
  }
  return (
    <>
      <Grid container gap="4rem">
        <Grid item xs={12} lg={8}>
          <CartTable cartItem={cartItem} />
        </Grid>

        <Grid item xs={12} lg={3} sx={{ marginTop: { lg: "2.8rem" } }}>
          <CartSummary orderSummary={orderSummary} />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
