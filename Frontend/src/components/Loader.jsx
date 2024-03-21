import { Box } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <img src="/gif/loader.gif" alt="loader" />
      </Box>
    </div>
  );
};

export default Loader;
