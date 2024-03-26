import * as Yup from "yup";
import dayjs from "dayjs";

const currentDate = dayjs();
export let recruitmentValidation = Yup.object({
  destination: Yup.string().required("Destination is required."),
  adventureType: Yup.string()
    .required("Adventure type is required.")
    .trim()
    .oneOf(["trek", "camp"]),
  teammatesCount: Yup.number()
    .required("Team Count is required.")
    .min(1, "Teammate count must be at least 1."),
  timePeriod: Yup.date()
    .nullable()
    .min(currentDate, "Date cannot be past dates."),
  requirement: Yup.string().required("Requirement is required.").trim(),
  contactNumber: Yup.number()
    .required("Contact number is required.")
    .min(10, "Contact Number must be 10 number."),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .min(50, "Description must be at least 50 character.")
    .max(500, "Description must be at max of 500 character."),
});
