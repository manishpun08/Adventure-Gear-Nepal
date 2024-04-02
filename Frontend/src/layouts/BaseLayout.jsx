import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import About from "../pages/About";

const BaseLayout = () => {
  return (
    <Box>
      <CustomSnackbar />
      <Outlet />
    </Box>
  );
};

export default BaseLayout;
