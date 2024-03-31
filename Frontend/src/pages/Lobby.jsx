import { Container, Typography } from "@mui/material";
import React from "react";
import LobbyFooter from "../components/LobbyFooter";
import LobbyBody from "../components/LobbyBody";

const Lobby = () => {
  return (
    <>
      <Container sx={{ marginTop: "2rem" }}>
        <Typography
          variant="h4"
          fontWeight="700"
          textAlign="center"
          sx={{ borderBottom: "2px solid #ddd", color: "#01579B" }}
        >
          Recruitment Lobby List
        </Typography>
        <LobbyBody />
        <LobbyFooter />
      </Container>
    </>
  );
};

export default Lobby;
