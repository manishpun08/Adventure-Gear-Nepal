import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const PriceRangePicker = () => {
  return (
    <div>
      <Formik
        initialValues={{
          minPrice: 0,
          maxPrice: 0,
        }}
        validationSchema={Yup.object({
          minPrice: Yup.number().min(0, "Min price must be at least 0."),
          maxPrice: Yup.number()
            .min(0, "Max price must be greater than 0.")
            .test({
              name: "maxPrice",
              message: "Max price must be greater than min price",
              test: function (value) {
                return value >= this.parent.minPrice;
              },
            }),
        })}
      >
        {({ handleSubmit, getFieldProps, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            id="price-range-picker"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <FormControl>
              <TextField
                label="Min Price"
                type="number"
                {...getFieldProps("minPrice")}
              />
              {touched.minPrice && errors.minPrice ? (
                <FormHelperText error>{errors.minPrice}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField
                label="Max Price"
                type="number"
                {...getFieldProps("maxPrice")}
              />
              {touched.maxPrice && errors.maxPrice ? (
                <FormHelperText error>{errors.maxPrice}</FormHelperText>
              ) : null}
            </FormControl>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PriceRangePicker;
