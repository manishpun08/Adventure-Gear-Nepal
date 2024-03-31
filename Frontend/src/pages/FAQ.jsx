import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/material";

const FAQ = () => {
  return (
    <Container>
      <Typography textAlign="center" fontWeight={800} mb={3} variant="h3">
        Frequently Asked Questions
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>What is your payment option?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For this college project, we have integrated Khalti for payment
            processing. Khalti allows you to make payments securely using
            various methods, including Khalti balance, bank account, mobile
            banking, and more. We chose Khalti as our payment partner to provide
            a convenient and reliable payment experience for our users during
            the project duration.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Are your products Genuine?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, all the products listed on our site are guaranteed to be 100%
            genuine. We understand the importance of authenticity, especially in
            a college project setting, and ensure that our products meet the
            highest standards. Additionally, each product comes with a warranty,
            providing you with peace of mind regarding your purchase. Our
            commitment to offering genuine products reflects our dedication to
            delivering a reliable and trustworthy experience to our users.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>What is the warranty of the product?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The warranty for each product may vary depending on the brand and
            product category. We adhere to the warranty policy established by
            the respective brands. For detailed information about the warranty
            coverage of a specific product, we recommend visiting the official
            website of the brand partner. By purchasing online, you gain the
            convenience of easily tracking your purchase and efficiently
            claiming any warranty benefits associated with the product. Rest
            assured, we strive to provide transparent and reliable warranty
            support to ensure your satisfaction with every purchase.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>What is your return policy?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            At present, we do not offer a return policy. However, we do provide
            an exchange policy, which allows exchanges to be made within 7 days
            of purchase. To qualify for an exchange, the packaging of the
            product must remain intact and undamaged. We prioritize customer
            satisfaction and aim to facilitate hassle-free exchanges to ensure
            your shopping experience meets your expectations.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>What adventure gear do you offer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We offer a wide range of adventure gear suitable for various outdoor
            activities, including trekking, camping, climbing, and more. Our
            collection includes tents, backpacks, sleeping bags, hiking boots,
            clothing, and accessories designed to enhance your outdoor
            experience.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            Can I find adventure gear suitable for beginners?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {`Yes, we cater to adventurers of all skill levels, including
            beginners. Our inventory includes beginner-friendly gear designed
            for ease of use, comfort, and reliability. Whether you're new to
            outdoor activities or a seasoned adventurer, we have gear suitable
            for your level of experience.`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
export default FAQ;
