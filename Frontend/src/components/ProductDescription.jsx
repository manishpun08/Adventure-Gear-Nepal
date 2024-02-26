import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Checkbox,
  Chip,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// main function
const ProductDescription = (props) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    if (count < props?.quantity) {
      setCount((prevCount) => {
        return prevCount + 1;
      });
    }
  };
  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => {
        return prevCount - 1;
      });
    }
  };

  useMutation({
    mutationKey: [""],
  });
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Return or Exchange" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography textAlign="justify">{`${props?.description}`}</Typography>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        No returns only exchange within 7 days of purchase. Packaging should be
        intact.
      </CustomTabPanel>

      <Box>
        <Container>
          <Stack direction="row" alignItems="center" mt="1rem" spacing={1}>
            <Chip label={props.brand} color="secondary" variant="outlined" />
            <Chip label={props.category} color="warning" variant="outlined" />
          </Stack>
          <Stack direction="row" alignItems="center" mt="1rem" spacing={1}>
            <Typography> Price:</Typography>
            <Typography>{props.price}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Typography> Free Shipping:</Typography>
            <Typography>
              <Checkbox checked={props.freeShipping} color="warning" />
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography> Available quantity:</Typography>
            <Typography>{props.quantity}</Typography>
          </Stack>
          {userRole === "buyer" && (
            <>
              {/* choose quantity */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={decreaseCount}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{count}</Typography>
                <IconButton onClick={increaseCount}>
                  <AddIcon />
                </IconButton>
              </Stack>

              <Button variant="contained" color="info">
                Add to Cart
              </Button>
            </>
          )}

          {userRole === "seller" && (
            <>
              <Stack direction="row" spacing={4} mt={1}>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  color="info"
                  onClick={() => {
                    navigate(`/product/edit/${props._id}`);
                  }}
                >
                  <Typography>Edit product</Typography>
                </Button>

                {/* delete product function  */}
                <DeleteProductDialog />
              </Stack>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductDescription;
