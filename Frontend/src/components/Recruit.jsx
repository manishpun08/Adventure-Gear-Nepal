import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import $axios from "../lib/axios.instance";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import styled from "@emotion/styled";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
const Recruit = () => {
  const currentDate = dayjs();

  const navigate = useNavigate();
  // for cloudniary image
  const [destinationImage, setDestinationImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // api hit
  const { mutate } = useMutation({
    mutationKey: ["add-recruitment"],
    mutationFn: async (values) => {
      return await $axios.post("/recruit/add", values);
    },
    onSuccess: (res) => {
      navigate("/lobby");
      console.log("success");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (imageLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Formik
          initialValues={{
            destination: "",
            adventure: "",
            teamCount: "",
            date: "",
            requirement: "",
            contactNumber: "",
            description: "",
            image: null,
          }}
          validationSchema={Yup.object({
            destination: Yup.string()
              .required("Destination is required.")
              .trim()
              .max(55, "Destination must be at max of 55 characters."),
            adventure: Yup.string()
              .oneOf(["Trek", "Camp"])
              .required("At least select 1 adventure."),
            teamCount: Yup.number()
              .required("Team Count is required")
              .min(1, "Team Count must be at least 1."),
            date: Yup.date()
              .required("Date is required")
              .min(currentDate, "Date cannot be past dates."),
            requirement: Yup.string()
              .required("Requirement is required.")
              .trim()
              .max(55, "Requirement must be at max of 55 characters."),
            contactNumber: Yup.number()
              .required("Contact Number is required")
              .min(10, "Contact Number must be 10 digits."),
            description: Yup.string()
              .required("Description is required.")
              .min(50, "Description is at least of 50 character.")
              .max(500, "Description is at most of 500 character.")
              .trim(),
            image: Yup.string().trim().nullable(),
          })}
          onSubmit={async (values) => {
            let imageUrl;

            const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            const data = new FormData();

            data.append("file", destinationImage);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloudname);

            if (destinationImage) {
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
                Add Recruitment
              </Typography>
              {destinationImage && (
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
                  Destination Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const file = event?.target?.files[0];
                      setDestinationImage(file);
                      setLocalUrl(URL.createObjectURL(file));
                    }}
                  />
                </Button>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "210px" }}>
                  <InputLabel required>Adventure</InputLabel>
                  <Select
                    label="Adventure"
                    {...formik.getFieldProps("adventure")}
                  >
                    <MenuItem value={"Trek"}>Trek</MenuItem>
                    <MenuItem value={"Camp"}>Camp</MenuItem>
                  </Select>
                  {formik.touched.adventure && formik.errors.adventure ? (
                    <FormHelperText error>
                      {formik.errors.adventure}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    required
                    label="Destination"
                    {...formik.getFieldProps("destination")}
                  />
                  {formik.touched.destination && formik.errors.destination ? (
                    <FormHelperText error>
                      {formik.errors.destination}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "210px" }}>
                  <TextField
                    required
                    label="Team Count"
                    type="number"
                    {...formik.getFieldProps("teamCount")}
                  />
                  {formik.touched.teamCount && formik.errors.teamCount ? (
                    <FormHelperText error>
                      {formik.errors.teamCount}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {/* date \ */}
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      label="Date"
                      value={formik.values.timePeriod}
                      onChange={(date) => {
                        formik.setFieldValue("date", date);
                      }}
                      textField={(props) => <TextField {...props} />}
                    />
                  </LocalizationProvider>
                  {formik.touched.date && formik.errors.date ? (
                    <FormHelperText error>{formik.errors.date}</FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ width: "210px" }}>
                  <TextField
                    required
                    label="Requirement"
                    {...formik.getFieldProps("requirement")}
                  />
                  {formik.touched.requirement && formik.errors.requirement ? (
                    <FormHelperText error>
                      {formik.errors.requirement}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    required
                    label="Contact Number"
                    type="number"
                    {...formik.getFieldProps("contactNumber")}
                  />
                  {formik.touched.contactNumber &&
                  formik.errors.contactNumber ? (
                    <FormHelperText error>
                      {formik.errors.contactNumber}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>

              <FormControl>
                <TextField
                  required
                  label="Description"
                  multiline
                  rows={5}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button type="submit" variant="contained" color="success">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default Recruit;
