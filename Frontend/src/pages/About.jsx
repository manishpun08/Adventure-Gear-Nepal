import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <div>
      <Container sx={{ marginTop: "2rem" }}>
        <Grid container justifyContent="space-between">
          <Grid item md={5.9} xs={12}>
            <img
              style={{ width: "100%", height: "580px" }}
              src="../img/aboutUs.webp"
              alt=""
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography textAlign="justify">
              {
                "Welcome to Adventure Gear Nepal, a college project aimed at revolutionizing the outdoor gear industry in Nepal! As a team of passionate adventurers and outdoor enthusiasts, we've come together to conceptualize and develop Adventure Gear Nepal as part of our academic journey. Our vision is to create a one-stop destination for adventurers seeking high-quality gear and equipment to fuel their exploration of Nepal's stunning landscapes and beyond. While we're currently in the developmental stage, our commitment to providing top-notch gear and exceptional service remains unwavering. At Adventure Gear Nepal, we're driven by a shared love for adventure and a dedication to excellence. Through meticulous research, innovative thinking, and collaboration with industry experts, we're crafting a curated selection of gear that meets the diverse needs of outdoor enthusiasts."
              }
            </Typography>
            <br />
            <Typography>
              {
                "As a college project, Adventure Gear Nepal serves as a learning platform for us to gain hands-on experience in entrepreneurship, marketing, product development, and more. We're embracing every challenge and opportunity that comes our way, knowing that each step brings us closer to our goal of launching a successful venture.While our journey is still unfolding, we invite you to join us on this exciting adventure. Stay tuned for updates on our progress, and be part of our story as we transform our college project into a thriving business that inspires and equips adventurers worldwide."
              }
            </Typography>
            <br />
            <Typography fontWeight={700}>
              Thank you for your interest and support! <br />
              The Adventure Gear Nepal Team
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
