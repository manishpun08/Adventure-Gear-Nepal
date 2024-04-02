import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../../lib/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../../store/slices/snackbarSlice";
import Loader from "../../components/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (values) => {
      return await $axios.put("/otp/password-change", {
        email: localStorage.getItem("email"),
        newPassword: values.newPassword,
      });
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/login");
      localStorage.clear();
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data.message));
    },
  });
  // hide and show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .required("Password is required.")
              .trim()
              .min(4, "Password must be at least 4 characters.")
              .max(20, "Password must be at max 20 characters."),

            confirmNewPassword: Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              "Password must match."
            ),
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
              <Typography variant="h5" fonntWeight="600" textAlign="center">
                Reset password
              </Typography>
              <Typography textAlign="center">
                {` Please choose your new password.`}
              </Typography>

              <FormControl variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...getFieldProps("newPassword")}
                />
                {touched.newPassword && errors.newPassword ? (
                  <FormHelperText error>{errors.newPassword}</FormHelperText>
                ) : null}
              </FormControl>

              {/* confirm password */}
              <FormControl variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  {...getFieldProps("confirmNewPassword")}
                />
                {touched.confirmNewPassword && errors.confirmNewPassword ? (
                  <FormHelperText error>
                    {errors.confirmNewPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button color="secondary" variant="contained" type="submit">
                reset password
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ResetPassword;
