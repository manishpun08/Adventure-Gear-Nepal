import { Box, Typography } from "@mui/material";
import React from "react";

const NoProductFound = () => {
  return (
    <Box textAlign="center" sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={700}>
        No Product Found.
      </Typography>
    </Box>
  );
};

export default NoProductFound;
