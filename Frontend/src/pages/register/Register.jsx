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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { openSuccessSnackbar } from "../../store/slices/snackbarSlice";
import $axios from "../../lib/axios.instance";

const Register = () => {
  // using navigate
  const navigate = useNavigate();

  // using redux for snackbar
  const dispatch = useDispatch();

  // Calculate min date
  const minDate = dayjs();

  // hide and show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // api hit
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    // on success
    onSuccess: (response) => {
      navigate("/login");
      dispatch(openSuccessSnackbar(response?.data?.message));
    },

    // on error
    onError: (error) => {
      dispatch(openSuccessSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "380px",
          minHeight: "140vh",
          margin: "0 auto",
        }}
      >
        {isLoading && <LinearProgress color="secondary" />}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
            role: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required("First Name is required.")
              .trim()
              .max(25, "First Name must be at max of 25 character."),
            lastName: Yup.string()
              .required("Last Name is required")
              .trim()
              .max(25, "First Name must be at max of 25 character."),
            email: Yup.string()
              .email("Email must be valid.")
              .required("Email is required.")
              .trim()
              .lowercase()
              .max(55, "Email must be at max of 55 character"),
            password: Yup.string()
              .required("Password is required.")
              .trim()
              .min(4, "Password must be at min 4 character.")
              .max(20, "Password must be at max 20 character."),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Password is required."),
            dob: Yup.date().nullable(),
            gender: Yup.string()
              .nullable()
              .oneOf(["male", "female", "other"])
              .trim(),
            role: Yup.string()
              .required("Role is required")
              .oneOf(["buyer", "seller"])
              .trim(),
          })}
          onSubmit={(values) => {
            values.dob = null;
            values.gender = null;
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
                width: "380px",
                borderRadius: "10px",
                transform: "translateY(5%)",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontWeight={700} variant="h5" mr={2}>
                  Sign Up
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
                  required
                  label="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  required
                  label="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  required
                  label="Email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              {/* password  */}
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
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
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
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <FormHelperText error>
                    {formik.errors.confirmPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" {...formik.getFieldProps("gender")}>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Prefer Not To Say</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender ? (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                ) : null}
              </FormControl>

              {/* dob */}
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="DOB"
                    disableFuture
                    minDate={minDate} // Set minimum date
                    value={
                      formik.values.dob
                        ? dayjs(formik.values.dob, "DD/MM/YYYY")
                        : null
                    } // Convert dob value to Date object
                    onChange={(date) => {
                      formik.setFieldValue(
                        "dob",
                        dayjs(date).format("DD/MM/YYYY")
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {formik.touched.dob && formik.errors.dob ? (
                  <FormHelperText error>{formik.errors.dob}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel required>Role</InputLabel>
                <Select label="Role" {...formik.getFieldProps("role")}>
                  <MenuItem value={"buyer"}>Buyer</MenuItem>
                  <MenuItem value={"seller"}>Seller</MenuItem>
                </Select>
                {formik.touched.role && formik.errors.role ? (
                  <FormHelperText error>{formik.errors.role}</FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained" color="info">
                Submit
              </Button>

              <Link to="/login">
                <Typography
                  variant="subtitle2"
                  textAlign="center"
                  sx={{ color: "blue" }}
                >
                  Already Registered? Login
                </Typography>
              </Link>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
