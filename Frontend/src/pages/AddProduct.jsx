import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../components/Loader";
import { addProduct } from "../lib/apis";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import $axios from "../lib/axios.instance";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddProduct = () => {
  const dispatch = useDispatch();

  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: "add-product",

    // api hit function
    mutationFn: addProduct,

    // success vayepaxi
    onSuccess: (response) => {
      navigate("/product");
      dispatch(openSuccessSnackbar(response?.data?.message));
    },

    // error aayepaxi
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const { data: categoriesData, isLoading: categoriesDataLoading } = useQuery({
    queryKey: ["categories-list"],
    queryFn: async () => {
      return await $axios("/product/categories").then(
        (res) => res.data.categories
      );
    },
  });

  if (isLoading || imageLoading || categoriesDataLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            brand: "",
            price: 0,
            quantity: 1,
            category: "",
            freeShipping: "",
            description: "",
            image: null,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required.")
              .trim()
              .max(55, "Name must be at max of 55 characters."),
            brand: Yup.string()
              .required("Brand is required.")
              .trim()
              .max(55, "Brand must be at max of 55 characters."),
            price: Yup.number()
              .required("Price is required")
              .min(0, "Price must be at least 0."),

            quantity: Yup.number()
              .required("Quantity is required")
              .min(1, "Quantity must be at least 1."),
            category: Yup.string()
              .required("Select a category")
              .trim()
              .oneOf(categoriesData?.map((c) => c.title)),
            freeShipping: Yup.boolean().default(false),
            description: Yup.string()
              .required("Description is required.")
              .min(500, "Description is at least of 500 character.")
              .max(1000, "Description is at most of 1000 character.")
              .trim(),

            image: Yup.string().trim().nullable(),
          })}
          onSubmit={async (values) => {
            let imageUrl;

            const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            const data = new FormData();

            data.append("file", productImage);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloudname);

            if (productImage) {
              try {
                setImageLoading(true);
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/upload
              `,
                  data
                );
                setImageLoading(false);
                imageUrl = res?.data?.secure_url;
              } catch (error) {
                setImageLoading(false);
                console.log("image upload failed...");
              }
            }
            values.image = imageUrl;

            mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: "450px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h5" textAlign="center">
                Add Product
              </Typography>

              {productImage && (
                <Stack sx={{ height: "300px" }}>
                  <img src={localUrl} style={{ height: "100%" }} />
                </Stack>
              )}
              <FormControl>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const file = event?.target?.files[0];
                      setProductImage(file);
                      setLocalUrl(URL.createObjectURL(file));
                    }}
                  />
                </Button>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <TextField label="Name" {...formik.getFieldProps("name")} />
                  {formik.touched.name && formik.errors.name ? (
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField label="Brand" {...formik.getFieldProps("brand")} />
                  {formik.touched.brand && formik.errors.brand ? (
                    <FormHelperText error>{formik.errors.brand}</FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <TextField
                    label="Price"
                    type="number"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <FormHelperText error>{formik.errors.price}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    label="Quantity"
                    type="number"
                    {...formik.getFieldProps("quantity")}
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <FormHelperText error>
                      {formik.errors.quantity}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2} alignContent="center">
                <FormControl sx={{ width: "185px" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    {...formik.getFieldProps("category")}
                  >
                    {categoriesData?.map((item, index) => (
                      <MenuItem key={index} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category ? (
                    <FormHelperText error>
                      {formik.errors.category}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Free Shipping</Typography>
                    <Checkbox
                      {...label}
                      {...formik.getFieldProps("freeShipping")}
                    />
                  </Stack>
                </FormControl>
              </Stack>

              <FormControl>
                <TextField
                  label="Description"
                  multiline
                  rows={7}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddProduct;
