import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
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
import { useNavigate, useParams } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";
import { useMutation, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";

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
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();

  const [count, setCount] = useState(1);

  // to increase count of quantity
  const increaseCount = () => {
    if (count === props?.quantity) {
      return;
    }
    setCount((prevCount) => prevCount + 1);
  };

  // to decrease count of quantity
  const decreaseCount = () => {
    if (count === 1) {
      return;
    }
    setCount((prevCount) => prevCount - 1);
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-product-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/item/add", {
        productId: params?.id,
        orderQuantity: count,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-count");
    },
    onError: (error) => {
      console.log("error");
    },
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
                <IconButton onClick={decreaseCount} disabled={count === 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{count}</Typography>
                <IconButton
                  onClick={increaseCount}
                  disabled={props.quantity === count}
                >
                  <AddIcon />
                </IconButton>
              </Stack>

              <Button variant="contained" color="info" onClick={() => mutate()}>
                Add to Cart
              </Button>
            </>
          )}
          {userRole === "seller" && (
            <>
              <Stack direction="row" spacing={4} mt={1}>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    navigate(`/product/edit/${props._id}`);
                  }}
                >
                  <Typography>Edit product</Typography>
                </Button>
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
