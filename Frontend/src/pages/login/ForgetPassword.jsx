import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../../lib/axios.instance";
import { openErrorSnackbar } from "../../store/slices/snackbarSlice";

const ForgetPassword = () => {
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
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .trim()
              .email("Must be valid email.")
              .required("Email is required.")
              .lowercase(),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: "400px",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: "#232f3e" }}
                textAlign="center"
              >
                Forget Password?
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
              >{`Enter your email below and we'll send you password reset OTP `}</Typography>
              <FormControl>
                <TextField
                  label="Email Address"
                  {...formik.getFieldProps("email")}
                ></TextField>
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained" color="info">
                Send Email
              </Button>
              <Link to="/login">
                <Typography
                  variant="subtitle2"
                  borderTop="1px solid #ddd"
                  textAlign="center"
                  lineHeight={4}
                >
                  Already have an account?
                </Typography>
              </Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ForgetPassword;
