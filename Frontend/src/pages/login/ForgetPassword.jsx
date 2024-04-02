import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../../store/slices/snackbarSlice";
import $axios from "../../lib/axios.instance";
import Loader from "../../components/Loader";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["send-otp-code"],
    mutationFn: async (values) => {
      localStorage.setItem("email", values.email);
      return await $axios.post("/otp/send", values);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/otp-verify");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
      console.log(error?.response);
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          minHeight: "80vh",
          margin: "0 auto",
          transform: "translateY(20%)",
        }}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Must be a valid email.")
              .required("Email is required."),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, touched, errors }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: "350px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h5" fontWeight="600" textAlign="center">
                Forgot password?
              </Typography>

              <Typography textAlign="center" variant="body2">
                {` Enter your email address below and we'll send you password reset
                OTP.`}
              </Typography>
              <FormControl>
                <TextField label="Email Address" {...getFieldProps("email")} />
                {touched.email && errors.email ? (
                  <FormHelperText error>{errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <Button color="secondary" variant="contained" type="submit">
                send email
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ForgetPassword;
