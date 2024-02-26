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
      {/* <p style={{ marginTop: "30rem" }}></p> */}

      <Box className="footer">
        <Box className="footer-top" sx={{ p: 3 }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={3}>
                <img
                  className="logo"
                  src="https://static.wixstatic.com/media/edb397_a212e3b64ee64b849ec059b238672e0a~mv2.png/v1/crop/x_82,y_196,w_918,h_608/fill/w_304,h_196,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/nepal%20sample%20(2).png"
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
