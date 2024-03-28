import Yup from "yup";

export let userEmailValidation = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
});

export let verifyOtpValidation = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  otp: Yup.number().required(),
});

export let forgetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  newPassword: Yup.string()
    .required("Password is required.")
    .trim()
    .min(4, "Password must be at min 4 character.")
    .max(20, "Password must be at max 20 character."),
});
