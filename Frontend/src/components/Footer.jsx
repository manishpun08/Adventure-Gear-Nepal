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
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <>
      <Box
        className="footer"
        sx={{
          width: "100%",
          marginTop: "auto",
          p: 3,
        }}
      >
        <Box className="footer-top">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} md={4}>
                <img
                  style={{ width: "90px" }}
                  className="logo"
                  src="/img/TreakLogo.png"
                  alt="logo"
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                  <Link to="terms">
                    <Typography sx={{ color: "#fff" }}>
                      Terms and Conditions
                    </Typography>
                  </Link>
                </ListItem>
              </Grid>

              <Grid
                container
                item
                xs={12}
                md={4}
                spacing={2}
                alignItems="center"
                color="#fff"
              >
                <Grid item>Follow Us on</Grid>
                <Grid item>
                  <a style={{ color: "#fff" }} href="https://www.facebook.com">
                    <FacebookIcon />
                  </a>
                </Grid>
                <Grid item>
                  <a style={{ color: "#fff" }} href="https://www.instagram.com">
                    <InstagramIcon />
                  </a>
                </Grid>
                <Grid item>
                  <a style={{ color: "#fff" }} href="https://www.linkedin.com">
                    <LinkedInIcon />
                  </a>
                </Grid>
                <Grid item>
                  <a style={{ color: "#fff" }} href="https://github.com">
                    <GitHubIcon />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box className="footer-bottom" sx={{ p: 2 }}>
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "white" }} variant="subtitle2">
                © 2024. Adventure Gear Nepal.
              </Typography>

              <Typography
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
                variant="subtitle2"
              >
                <img
                  style={{ width: "70px", marginRight: "10px" }}
                  src="https://seeklogo.com/images/K/khalti-logo-F0B049E67E-seeklogo.com.png"
                  alt=""
                />
                For Payment
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
