import { Typography } from "@mui/material";
import React from "react";
import LobbyFooter from "../components/LobbyFooter";
import LobbyBody from "../components/LobbyBody";

const Lobby = () => {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{ borderBottom: "2px solid #ddd" }}
      >
        Recruitment Lobby List
      </Typography>
      <LobbyBody />
      <LobbyFooter />
    </>
  );
};

export default Lobby;
