import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const CartSummary = ({ orderSummary }) => {
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
          <Grid container key={index} textAlign="center">
            <Grid item md={6}>
              <Typography textAlign="left" sx={{ textTransform: "capitalize" }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography textAlign="left">Rs:{item.value}</Typography>
            </Grid>
          </Grid>
        );
      })}

      <Button variant="contained" color="secondary">
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
