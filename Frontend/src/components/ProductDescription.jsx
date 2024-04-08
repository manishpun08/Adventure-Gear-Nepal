import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios.instance";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import DeleteProductDialog from "./DeleteProductDialog";
import ProductAddReviewDialog from "./ProductAddReviewDialog";

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
  const dispatch = useDispatch();

  console.log(props);

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

  // add product to cart
  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-product-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/item/add", {
        productId: params?.id,
        orderQuantity: count,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("get-cart-item-count");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  //  for rating and review
  const { data: hasUserPurchasedProduct } = useQuery({
    queryKey: ["has-purchased", params?.id],
    queryFn: async () => {
      return await $axios
        .get(`/product/has-purchased/${params?.id}`)
        .then((res) => res.data.hasUserPurchasedProduct);
    },
  });

  const [showAddReviewDialog, setShowAddReviewDialog] = React.useState(false);

  const currentUserId = localStorage.getItem("userId");
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
      {/* product description  */}
      <CustomTabPanel value={value} index={0}>
        <Typography textAlign="justify">{`${props?.description}`}</Typography>
      </CustomTabPanel>
      {/* rating and reviews  */}
      <CustomTabPanel value={value} index={1}>
        {props.ratings.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <p style={{ fontWeight: 800, fontSize: 32 }}>
              {(
                props.ratings.reduce((acc, cur) => acc + cur.value, 0) /
                props.ratings.length
              ).toFixed(1)}
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", fontSize: 12 }}
            >
              <p>Out of</p>
              <p style={{ marginTop: -4 }}>5 Stars</p>
            </div>
            <Rating
              value={
                props.ratings.reduce((acc, cur) => acc + cur.value, 0) /
                props.ratings.length
              }
              precision={0.5}
              size="large"
              readOnly
              sx={{ marginLeft: 1 }}
            />
          </div>
        )}
        {props.sellerId == currentUserId ||
        props.ratings?.findIndex((r) => r.user._id == currentUserId) > -1 ||
        !hasUserPurchasedProduct ? null : (
          <Button
            startIcon={<AddIcon />}
            sx={{ marginBottom: 2 }}
            onClick={() => setShowAddReviewDialog(true)}
          >
            Add review
          </Button>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {props.ratings?.length > 0 ? (
            props.ratings.map((r) => (
              <div key={r._id}>
                <Rating value={r.value} precision={0.5} readOnly />
                <p style={{ fontWeight: 600 }}>
                  {r.user.firstName} {r.user.lastName} -{" "}
                  {new Date(r.createdAt).toDateString()}
                </p>
                <p>{r.title}</p>
                <p>{r.body}</p>
              </div>
            ))
          ) : (
            <Typography textAlign="justify">No reviews yet</Typography>
          )}
        </div>
      </CustomTabPanel>
      {/* return and exchange */}
      <CustomTabPanel value={value} index={2}>
        No returns only exchange within 7 days of purchase. Packaging should be
        intact.
      </CustomTabPanel>
      {/* other functionality  */}
      <Box>
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
        {/* if the role is buyer  */}
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
        {/* if the role is seller  */}
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
      </Box>

      <ProductAddReviewDialog
        productId={params?.id}
        show={showAddReviewDialog}
        closeHandler={() => setShowAddReviewDialog(false)}
      />
    </>
  );
};

export default ProductDescription;
