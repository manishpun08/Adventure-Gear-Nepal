import bcrypt from "bcrypt";
import express from "express";
import User from "../user/user.model.js";
import { sendEmailOTP } from "./email.service.js";
import {
  forgetPasswordValidationSchema,
  userEmailValidation,
  verifyOtpValidation,
} from "./forget.validation.js";
import { OTP } from "./otp.model.js";
import otpGenerator from "otp-generator";

const router = express.Router();

// send otp to email
router.post(
  "/otp/send",
  // validating data
  async (req, res, next) => {
    // extract newValues from req.body
    const newValues = req.body;

    // validate newValues using Yup Schema
    try {
      const validatedData = await userEmailValidation.validate(newValues);

      req.body = validatedData;
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }
    // call next function
    next();
  },
  async (req, res) => {
    // extract email from req.body
    const { email } = req.body;

    // find user using email
    const user = await User.findOne({ email });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "Email does not exists." });
    }

    // generate and send otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp);
    // send email
    await sendEmailOTP(user.firstName, otp);

    // delete previous otp if same email request multiple time
    await OTP.deleteMany({ email });

    // create otp table
    await OTP.create({ otp, email });

    // send response
    return res.status(200).send({ message: "OTP is sent successfully." });
  }
);

// verify otp
router.post(
  "/otp/verify",
  // validating data
  async (req, res, next) => {
    // extract newValues from req.body
    const newValues = req.body;

    // validate newValues using Yup Schema
    try {
      const validatedData = await verifyOtpValidation.validate(newValues);

      req.body = validatedData;
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }
    // call next function
    next();
  },

  async (req, res) => {
    // extract verification data from req.body
    const verificationData = req.body;

    // find otp document using email
    const otpDoc = await OTP.findOne({ email: verificationData.email });

    // if not otp, throw error
    if (!otpDoc) {
      return res.status(404).send({ message: "Something went wrong." });
    }
    // check otp if matches
    const isOtpMatch = verificationData.otp === otpDoc.otp;

    // if otp does't match, throw error
    if (!isOtpMatch) {
      return res.status(404).send({ message: "Something went wrong." });
    }

    // set isVerified to true
    await OTP.updateOne(
      { email: verificationData.email },
      {
        $set: {
          isVerified: true,
        },
      }
    );

    // send status
    return res.status(200).send({ message: "Opt is verified successfully." });
  }
);

//change password
router.put(
  "/otp/password-change",
  // validating data
  async (req, res, next) => {
    // extract newValues from req.body
    const newValues = req.body;

    // validate newValues using Yup Schema
    try {
      const validatedData = await forgetPasswordValidationSchema.validate(
        newValues
      );

      req.body = validatedData;
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }
    // call next function
    next();
  },
  async (req, res) => {
    // extract new password from req.body
    const { email, newPassword } = req.body;

    // find otp document using this email
    const optDoc = await OTP.findOne({ email });

    // if not otpDoc throw, error
    if (!optDoc) {
      return res.status(404).send({ message: "Something went wrong." });
    }

    // if otp is not verified, throw error
    if (!optDoc.isVerified) {
      return res.status(404).send({ message: "Something went wrong." });
    }

    // let user change password
    // password should be hashed format
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    await User.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    // delete otp doc for this email
    await OTP.deleteMany({ email });

    return res
      .status(200)
      .send({ message: "Password is updated successfully." });
  }
);

export default router;
