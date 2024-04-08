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
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../../store/slices/snackbarSlice";

const Login = () => {
  const dispatch = useDispatch();

  // using navigate
  const navigate = useNavigate();

  // api hit
  const { isLoading, mutate } = useMutation({
    mutationKey: "login-user",
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },

    // on success
    onSuccess: (response) => {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userRole", response?.data?.user?.role);
      localStorage.setItem("firstName", response?.data?.user?.firstName);
      localStorage.setItem("lastName", response?.data?.user?.lastName);
      localStorage.setItem("userId", response?.data?.user?._id);
      navigate("/home");
      dispatch(openSuccessSnackbar(response?.data?.message));
    },

    // on error
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // hide and show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
        {isLoading && <LinearProgress color="secondary" />}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .trim()
              .email("Must be valid email.")
              .required("Email is required.")
              .lowercase(),

            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={(values) => {
            mutate(values);
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
                width: "350px",
                borderRadius: "10px",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontWeight={700} variant="h5" mr={2}>
                  Sign In
                </Typography>
                <Box mt={1}>
                  <img
                    style={{
                      width: "60px",
                      background: "black",
                      borderRadius: "50%",
                    }}
                    src="/img/TreakLogo.png"
                    alt=""
                  />
                </Box>
              </Box>

              <FormControl>
                <TextField
                  label="Email"
                  {...formik.getFieldProps("email")}
                ></TextField>
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
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
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained" color="info">
                Log In
              </Button>
              <Stack direction="row" justifyContent="space-between">
                <Link to="/register">
                  <Typography variant="subtitle2" textAlign="center">
                    New here? Register
                  </Typography>
                </Link>
                <Link to="/forgot-password">
                  <Typography variant="subtitle2" textAlign="center">
                    Forget Password
                  </Typography>
                </Link>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
