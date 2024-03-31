import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <Container>
      <Stack direction="row" spacing={5}>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.361352252173!2d85.33182811279417!3d27.70612726003992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a00bd8d7c1%3A0xe01225b704668023!2sLord%20Buddha%20Education%20Foundation-%20LBEF%20CAMPUS%20(The%20First%20IT%20College%20of%20Nepal)!5e0!3m2!1sen!2snp!4v1711294369184!5m2!1sen!2snp"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
        <Box>
          <Typography>
            {
              "Thank you for your interest in Adventure Gear Nepal! Please note that Adventure Gear Nepal is currently a project being developed as part of a college endeavor. While we're thrilled about the prospect of launching in the future, we're not yet operational."
            }
          </Typography>
          <br />
          <Typography>
            However, we are excited to hear from you and welcome any inquiries,
            feedback, or collaborations. Please feel free to reach out to us via
            email at{" "}
            <a href="mailto:manishpunmagar48@gmail.com">
              manishpunmagar48@gmail.com
            </a>{" "}
            or through our social media channels listed below.
          </Typography>
          <br />
          <Typography>
            In the meantime, stay tuned for updates on our progress and future
            launch plans. We appreciate your patience and look forward to
            embarking on adventures together in the near future!
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Contact;
