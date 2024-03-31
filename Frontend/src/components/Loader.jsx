import { Box } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Box>
        <img
          style={{ display: "flex", margin: "0 auto" }}
          src="/gif/loader.gif"
          alt="loader"
        />
      </Box>
    </div>
  );
};

export default Loader;
