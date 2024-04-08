import React from "react";
import { Box, Grid, Typography, Button, Container, Stack } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const Banner = () => {
  return (
    <div>
      <Box bgcolor="black" minHeight={100}>
        <Container>
          <Grid container gap="4rem" color="#fff">
            <Grid item xs={12} lg={5}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                padding={2}
              >
                <ShoppingBagIcon sx={{ fontSize: "7rem" }} />
                <Typography sx={{ fontSize: "1.7rem" }} fontWeight={600}>
                  QUICK ACCESS
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                padding={2}
              >
                <LocalShippingIcon sx={{ fontSize: "7rem" }} />
                <Typography sx={{ fontSize: "1.7rem" }} fontWeight={600}>
                  Fast Delivery
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              alignItems="right"
              alignContent="right"
              justifyContent="flex-end"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361352252173!2d85.33182811279417!3d27.70612726003992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20CAMPUS%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1711294369184!5m2!1sen!2snp"
                width="400"
                height="350"
                style={{ border: 0, padding: "1rem" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Banner;
