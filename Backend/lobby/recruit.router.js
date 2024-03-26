import express from "express";
import { recruitmentValidation } from "./recruitment.validation.js";
import Recruitment from "./recruitment.model.js";

const router = express.Router();

// add recruitment
router.post(
  "/recruit/add",
  async (req, res, next) => {
    // extract new user from req.body
    const values = req.body;
    // validate new user
    try {
      const validatedData = await recruitmentValidation.validate(values);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const values = req.body;

    await Recruitment.create(values);

    return res
      .status(200)
      .send({ message: "Recruitment is added successfully", values });
  }
);
export default router;
