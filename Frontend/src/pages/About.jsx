import { Grid, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item md={5.9} xs={12}>
          <img style={{ width: "100%" }} src="../img/aboutUs.webp" alt="" />
        </Grid>

        <Grid item md={6} xs={12}>
          <Typography textAlign="justify">
            {
              "At Adventure Gear Nepal, we're more than just a retailer – we're your partners in adventure. With a passion for exploration and a commitment to quality, we provide adventurers like you with the gear and expertise needed to conquer any challenge, from the towering peaks of the Himalayas to the untamed wilderness of the Nepalese countryside. Our mission is simple: to empower outdoor enthusiasts with the tools they need to turn their dreams into reality. Whether you're a seasoned mountaineer or a novice trekker, our extensive selection of gear caters to every skill level and ambition. From high-performance clothing and footwear to cutting-edge camping equipment and technical gear, we've curated a comprehensive range of products from leading brands around the world."
            }
          </Typography>
          <br />
          <Typography>
            {
              "But Adventure Gear Nepal is more than just a retailer – we're a community hub for adventurers, offering expert advice, insightful tips, and invaluable resources to help you plan your next expedition with confidence. Our team of experienced outdoor enthusiasts is here to guide you every step of the way, whether you're choosing the right gear or seeking advice on the best routes and destinations.At Adventure Gear Nepal, we believe that the spirit of adventure knows no bounds. That's why we're dedicated to providing accessible, reliable, and high-quality gear to adventurers of all backgrounds and abilities. We're proud to be your trusted companion on your journey to explore the breathtaking beauty of Nepal and beyond"
            }
          </Typography>
          <br />
          <Typography fontWeight={700}>
            Join us as we embark on the ultimate adventure – together. Adventure
            Gear Nepal: Where Your Journey Begins.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
