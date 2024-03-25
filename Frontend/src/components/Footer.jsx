import {
  Box,
  Button,
  Container,
  Grid,
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
                <Typography
                  sx={{ paddingBottom: "1rem", color: "white" }}
                  variant="h6"
                >
                  Contact Us
                </Typography>
                <ul>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>FAQ</Link>
                  </li>
                  <li>
                    <Link>Stories and Blogs</Link>
                  </li>
                  <li>
                    <Link>Terms and Conditions</Link>
                  </li>
                </ul>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography
                  sx={{ paddingBottom: "1rem", color: "white" }}
                  variant="h6"
                >
                  Contact Us
                </Typography>
                <ul>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>FAQ</Link>
                  </li>
                  <li>
                    <Link>Stories and Blogs</Link>
                  </li>
                  <li>
                    <Link>Terms and Conditions</Link>
                  </li>
                </ul>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography
                  sx={{ paddingBottom: "1rem", color: "white" }}
                  variant="h6"
                >
                  Contact Us
                </Typography>
                <ul>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>FAQ</Link>
                  </li>
                  <li>
                    <Link>Stories and Blogs</Link>
                  </li>
                  <li>
                    <Link>Terms and Conditions</Link>
                  </li>
                </ul>
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
