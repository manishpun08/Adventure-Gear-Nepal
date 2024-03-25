import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";
import Loader from "./Loader";

const CartSummary = ({ orderSummary, grandTotal, productDataForOrdering }) => {
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["initiate-khalti-payment"],
    mutationFn: async () => {
      return await $axios.post("/payment/khalti/start", {
        amount: grandTotal,
        productList: productDataForOrdering,
      });
    },

    onSuccess: (res) => {
      const productUrl = res?.data?.paymentDetails?.payment_url;

      if (productUrl) {
        // for redirecting payment url
        window.location.href = productUrl;
      } else {
        dispatch(openErrorSnackbar("Payment URL not found."));
      }
    },

    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        alignItems: "center",
        padding: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Order Summary
      </Typography>

      {orderSummary.map((item, index) => {
        return (
          <Grid container key={index}>
            <Grid item xs={6}>
              <Typography textAlign="left" sx={{ textTransform: "capitalize" }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography textAlign="left">Rs:{item.value}</Typography>
            </Grid>
          </Grid>
        );
      })}

      <Button variant="contained" color="secondary" onClick={() => mutate()}>
        Pay with khalti
      </Button>
    </Box>
  );
};

export default CartSummary;
