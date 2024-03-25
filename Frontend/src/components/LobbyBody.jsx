import { Box, Typography } from "@mui/material";
import React from "react";

const LobbyBody = () => {
  return (
    <>
      <Box height="60vh">
        <Typography
          variant="h3"
          fontWeight="700"
          textAlign="center"
          lineHeight="50vh"
        >
          Nobody is Recruiting.
        </Typography>
      </Box>
    </>
  );
};

export default LobbyBody;
