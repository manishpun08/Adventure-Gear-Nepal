import express from "express";
import { recruitmentValidation } from "./recruitment.validation.js";
import Recruitment from "./recruitment.model.js";
import User from "../user/user.model.js";
import { isUser } from "../middleware/authentication.middleware.js";

const router = express.Router();

// add recruitment group
router.post(
  "/recruit/add",
  // validating request
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
  // creating recruit table
  async (req, res) => {
    const values = req.body;

    await Recruitment.create(values);

    return res
      .status(200)
      .send({ message: "Recruitment is added successfully", values });
  }
);

// get recruitment list
router.get("/recruit/get/list", async (req, res) => {
  const recruitList = await Recruitment.aggregate([
    { $match: {} },

    {
      $project: {
        destination: 1,
        adventure: 1,
        teamCount: 1,
        date: 1,
        requirement: 1,
        contactNumber: 1,
        description: 1,
        image: 1,
      },
    },
  ]);
  console.log(recruitList);
  return res.status(200).send({
    message: "Recruitment list is displayed successfully.",
    recruitList,
  });
});

// add member to lobby
router.get("/lobby/add", isUser, async (req, res) => {
  // const { email } = req.body;
  // const user = await User.findOne({ email });
  // const userProfile = await User.aggregate([
  //   {
  //     $match: { userId: req.loggedInUserId },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "userId",
  //       foreignField: "_id",
  //       as: "userDetails",
  //     },
  //   },
  //   {
  //     $project: {
  //       firstName: 1,
  //       lastName: 1,
  //       role: 1,
  //     },
  //   },
  // ]);

  console.log(user);
  return res
    .status(200)
    .send({ message: "User is added to lobby successfully." });
});

// get member list

export default router;
