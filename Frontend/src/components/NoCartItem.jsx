import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoCartItem = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5">No item in cart</Typography>
      <Button
        sx={{ width: "10rem" }}
        variant="contained"
        onClick={() => {
          navigate("/product");
        }}
      >
        Keep shopping
      </Button>
    </Stack>
  );
};

export default NoCartItem;
