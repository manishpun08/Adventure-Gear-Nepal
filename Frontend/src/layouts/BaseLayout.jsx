import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { Box } from "@mui/material";

const BaseLayout = () => {
  return (
    <Box>
      <CustomSnackbar />
      <Outlet />
    </Box>
  );
};

export default BaseLayout;
