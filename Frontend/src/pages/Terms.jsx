import { Container, Typography } from "@mui/material";
import React from "react";

const Terms = () => {
  return (
    <div>
      <Container sx={{ marginTop: "2rem" }}>
        <Typography textAlign="center" fontWeight={800} mb={3} variant="h3">
          Terms and Conditions
        </Typography>
        <Typography>
          Adventure Gear Nepal is dedicated to providing high-quality outdoor
          adventure equipment and accessories to our customers. When purchasing
          products from us, you agree to abide by the terms and conditions
          outlined herein. We aim to offer accurate product information,
          including descriptions, prices, and availability, although slight
          variations may occur. Orders placed on our website constitute an offer
          to purchase, subject to our acceptance, and payment must be made in
          full at the time of ordering.
        </Typography>
        <br />
        <Typography>
          Our products come with manufacturer warranties, and we disclaim
          liability for any indirect, incidental, or consequential damages
          arising from product use or misuse. All content on our website is our
          intellectual property and protected by copyright laws. These terms and
          conditions are governed by Nepalese law, and any disputes shall be
          resolved through negotiation or mediation, with legal recourse as a
          last resort. We reserve the right to update these terms at any time,
          and it is your responsibility to review them periodically for changes.
          For any inquiries, please contact us.
        </Typography>
      </Container>
    </div>
  );
};

export default Terms;
