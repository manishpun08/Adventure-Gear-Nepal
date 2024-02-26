import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import { addProduct } from "../lib/apis";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const AddProduct = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: "add-product",
    mutationFn: addProduct,

    // success vayepaxi
    onSuccess: (response) => {
      navigate("/product");
    },

    // error aayepaxi
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {isLoading && <LinearProgress color="success" />}
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
            .oneOf(productCategories),
          freeShipping: Yup.boolean().default(false),
          description: Yup.string()
            .required("Description is required.")
            .min(500, "Description is at least of 500 character.")
            .max(1000, "Description is at most of 1000 character.")
            .trim(),

          image: Yup.string().trim().nullable(),
        })}
        onSubmit={(values) => {
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
              width: "400px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5" textAlign="center">
              {" "}
              Add Product
            </Typography>

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
                <FormHelperText error>{formik.errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...formik.getFieldProps("category")}>
                {productCategories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category ? (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl>
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography>Free Shipping</Typography>
                <Checkbox
                  {...label}
                  {...formik.getFieldProps("freeShipping")}
                />
              </Stack>
            </FormControl>

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
  );
};

export default AddProduct;
