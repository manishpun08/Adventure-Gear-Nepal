import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useQueries, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import $axios from "../lib/axios.instance";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";
import { useDispatch } from "react-redux";
import { togglePaymentStatus } from "../store/slices/paymentSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pidx = searchParams.get("pidx");

  const { isLoading, data } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: async () => {
      return await $axios.post("/payment/khalti/verify", {
        pidx,
        data,
      });
    },
    onSuccess: (res) => {
      dispatch(togglePaymentStatus());
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3">Payment is successful.</Typography>
        <Typography variant="h3">Thanks for shopping with us.</Typography>
        <Button
          sx={{ width: "10rem" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/product");
          }}
        >
          Keep Shopping.
        </Button>
      </Stack>
    </Container>
  );
};

export default PaymentSuccess;
