import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

const BaseLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
