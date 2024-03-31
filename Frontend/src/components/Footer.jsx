import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Box className="footer">
        <Box className="footer-top" sx={{ p: 3 }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={3}>
                <img
                  style={{ width: "90px" }}
                  className="logo"
                  src="/img/TreakLogo.png"
                  alt="logo"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <ListItem>
                  <Link to="contact">
                    <Typography sx={{ color: "#fff" }} fontSize="18px">
                      Contact Us
                    </Typography>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link to="about">
                    <Typography sx={{ color: "#fff" }}>About Us</Typography>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link to="faq">
                    <Typography sx={{ color: "#fff" }}>FAQ</Typography>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link>
                    <Typography sx={{ color: "#fff" }}>
                      Terms and Conditions
                    </Typography>
                  </Link>
                </ListItem>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box className="footer-bottom" sx={{ p: 2 }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: "white" }} variant="subtitle2">
                  © 2024. Adventure Gear Nepal.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row"></Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
