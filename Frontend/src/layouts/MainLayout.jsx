import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "6rem 0",
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
