import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          marginBottom: "2rem",
        }}
      >
        <Outlet />
        <CustomSnackbar />
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
