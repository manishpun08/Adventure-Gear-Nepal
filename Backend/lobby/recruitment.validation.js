import * as Yup from "yup";
import dayjs from "dayjs";

const currentDate = dayjs();

export let recruitmentValidation = Yup.object({
  destination: Yup.string().required("Destination is required."),
  adventure: Yup.string()
    .required("Adventure type is required.")
    .trim()
    .oneOf(["Trek", "Camp"]),
  teamCount: Yup.number()
    .required("Team Count is required.")
    .min(1, "Teammate count must be at least 1."),
  date: Yup.date().min(currentDate, "Date cannot be past dates."),
  requirement: Yup.string().required("Requirement is required.").trim(),

  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(
      /^[0-9]{10}$/,
      "Contact Number must be Number and exactly 10 digits."
    ),

  description: Yup.string()
    .required("Description is required.")
    .trim()
    .min(50, "Description must be at least 50 character.")
    .max(500, "Description must be at max of 500 character."),
  image: Yup.string().nullable().trim(),
});
