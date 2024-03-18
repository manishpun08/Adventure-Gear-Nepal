import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Loader from "./Loader";
import $axios from "../lib/axios.instance";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

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

const EditProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  // get product details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${params.id}`);
    },
  });

  const productDetails = data?.data?.productDetails;

  // edit product
  // isLoading: editProductLoading :: just renaming isLoading
  const { isLoading: editProductLoading, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${params.id}`, values);
    },
    onSuccess: (res) => {
      navigate(`/productDetails/${params.id}`);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isLoading || editProductLoading || imageLoading) {
    return <Loader />;
  }
  return (
    <>
      <Formik
        //re initialize garna milne
        enableReinitialize
        initialValues={{
          name: productDetails?.name || "",
          brand: productDetails?.brand || "",
          price: productDetails?.price || 0,
          quantity: productDetails?.quantity || 1,
          category: productDetails?.category || "",
          freeShipping: productDetails?.freeShipping || false,
          description: productDetails?.description || "",
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
            .oneOf(productCategories),
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
        {({ handleSubmit, getFieldProps, errors, touched, values }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              width: "350px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Edit Product
            </Typography>
            {/* cloudniary image  */}
            <Stack sx={{ height: "250px" }}>
              {(localUrl || productDetails?.image) && (
                <img
                  src={localUrl || productDetails?.image}
                  style={{ height: "100%" }}
                  alt={productDetails?.name}
                />
              )}
            </Stack>
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
            <FormControl>
              <TextField label="Name" {...getFieldProps("name")} />
              {touched.name && errors.name ? (
                <FormHelperText error>{errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField label="Brand" {...getFieldProps("brand")} />
              {touched.brand && errors.brand ? (
                <FormHelperText error>{errors.brand}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField
                label="Price"
                type="number"
                {...getFieldProps("price")}
              />
              {touched.price && errors.price ? (
                <FormHelperText error>{errors.price}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <TextField
                label="Quantity"
                type="number"
                {...getFieldProps("quantity")}
              />
              {touched.quantity && errors.quantity ? (
                <FormHelperText error>{errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...getFieldProps("category")}>
                {productCategories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {touched.category && errors.category ? (
                <FormHelperText error>{errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography>Free Shipping</Typography>
                <Checkbox
                  checked={values.freeShipping}
                  {...getFieldProps("freeShipping")}
                />
              </Stack>
            </FormControl>

            <FormControl>
              <TextField
                label="Description"
                multiline
                rows={7}
                {...getFieldProps("description")}
              />
              {touched.description && errors.description ? (
                <FormHelperText error>{errors.description}</FormHelperText>
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
    </>
  );
};

export default EditProduct;
