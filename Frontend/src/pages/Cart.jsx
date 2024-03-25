import { Grid } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import CartSummary from "../components/CartSummary";
import CartTable from "../components/CartTable";
import Loader from "../components/Loader";
import NoCartItem from "../components/NoCartItem";
import $axios from "../lib/axios.instance";

const Cart = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-items"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartItem = data?.data?.cartItem;
  const orderSummary = data?.data?.orderSummary;
  const grandTotal = data?.data?.grandTotal;

  const productDataForOrdering = cartItem?.map((item) => {
    return {
      productId: item?.productId,
      orderQuantity: item?.orderQuantity,
      sellerId: item?.sellerId,
      unitPrice: item?.price,
      subTotal: item?.subTotal,
    };
  });

  if (isLoading) {
    return <Loader />;
  }
  // if no cart items then show this
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
          <CartSummary
            orderSummary={orderSummary}
            grandTotal={grandTotal}
            productDataForOrdering={productDataForOrdering}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
