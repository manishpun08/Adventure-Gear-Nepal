import { useState } from "react";

// material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import $axios from "../../lib/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../../store/slices/snackbarSlice";
import Loader from "../../components/Loader";

// project imports

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [code, setCode] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  const handleChange = (event, name) => {
    const re = /^[0-9\b]+$/;
    if (
      event.target?.value.length < 2 &&
      (event.target?.value === "" || re.test(event.target?.value))
    ) {
      setCode({ ...code, [name]: event.target?.value });
    }
  };

  const inputSX = {
    ...theme.typography.customInput,
    "& > div > input": {
      p: { xs: 1.5, md: 2 },
      textAlign: "center",
    },
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async () => {
      return await $axios.post("/otp/verify", {
        email: localStorage.getItem("email"),
        otp:
          code.code1 +
          code.code2 +
          code.code3 +
          code.code4 +
          code.code5 +
          code.code6,
      });
    },

    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/reset-password");
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
        gap: "1rem",
        padding: "2rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: "600px",
        borderRadius: "10px",
        margin: "0 auto",
        transform: "translateY(20%)",
      }}
    >
      <Stack alignItems="center">
        <Typography fontWeight="600" variant="h6">
          Enter Verification Code
        </Typography>
        <Typography>We send you on email.</Typography>
        <Typography>We have sent you code on :xyz@gmail.com</Typography>
      </Stack>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname1"
            type="text"
            value={code.code1}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code1")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname2"
            type="text"
            value={code.code2}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code2")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname3"
            type="text"
            value={code.code3}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code3")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code4}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code4")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code5}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code5")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            margin="normal"
            name="fname4"
            type="text"
            value={code.code6}
            sx={inputSX}
            placeholder="9"
            onChange={(e) => handleChange(e, "code6")}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => {
            mutate();
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default OtpVerify;
