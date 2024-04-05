import express from "express";
import { isUser } from "../middleware/authentication.middleware.js";
import User from "../user/user.model.js";
import Lobby from "./lobby.model.js";
import { lobbyValidation } from "./lobby.validation.js";
import dayjs from "dayjs";

const router = express.Router();

// creating lobby
router.post(
  "/lobby/create",
  isUser,
  // validating request
  async (req, res, next) => {
    // extract new user from req.body
    const values = req.body;
    // validate new user
    try {
      const validatedData = await lobbyValidation.validate(values);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  // creating lobby table
  async (req, res) => {
    let values = req.body;
    values.lobbyExpireAt = dayjs(values.date).startOf("day").add(1, "d");

    // logged in user
    const loggedInUserId = req.loggedInUserId;
    values.group.push(loggedInUserId);

    await Lobby.create(values);

    return res
      .status(200)
      .send({ message: "Lobby is created successfully", values });
  }
);

// Add member to lobby by id
// user can directly join group
// no need for admin's approval
router.post("/lobby/addUser/:id", isUser, async (req, res) => {
  try {
    const lobbyId = req.params.id;

    const loggedInUserId = req.loggedInUserId;

    // Find the lobby document based on the provided ID
    const lobby = await Lobby.findById({ _id: lobbyId });

    // Check if the lobby exists
    if (!lobby) {
      return res.status(404).send({ message: "Lobby not found." });
    }

    // Check if the user is already in the lobby
    if (lobby.group.includes(loggedInUserId)) {
      return res
        .status(409)
        .send({ message: "User is already added to the lobby." });
    }

    // Add the user's ID to the lobby's group array
    await Lobby.updateOne(
      { _id: lobbyId },
      {
        $addToSet: {
          group: loggedInUserId,
        },
      }
    );

    return res.status(200).send({
      message: "User is added to the lobby successfully.",
    });
  } catch (error) {
    console.error("Error adding user to lobby:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
});

// leave lobby by member
router.post("/lobby/removeUser/:id", isUser, async (req, res) => {
  try {
    const lobbyId = req.params.id;

    const loggedInUserId = req.loggedInUserId;

    // Find the lobby document based on the provided ID
    const lobby = await Lobby.findById({ _id: lobbyId });

    // Check if the lobby exists
    if (!lobby) {
      return res.status(404).send({ message: "Lobby not found." });
    }

    // Add the user's ID to the lobby's group array
    await Lobby.updateOne(
      { _id: lobbyId },
      {
        $pull: {
          $group: loggedInUserId,
        },
      }
    );

    console.log("User removed from lobby successfully.");
    return res.status(200).send({
      message: "User is removed from the lobby successfully.",
    });
  } catch (error) {
    console.error("Error removing user from lobby:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
});

// getting lobby list
router.get("/recruit/get/list", async (req, res) => {
  const recruitList = await Lobby.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "group",
        foreignField: "_id",
        as: "userDetail",
      },
    },

    {
      $project: {
        destination: 1,
        image: 1,
        teamCount: 1,
        "userDetail.firstName": 1,
        "userDetail.lastName": 1,
        "userDetail.image": 1,
        "userDetail._id": 1,
      },
    },
  ]);

  // calculate remaining spot
  const newRecruitList = recruitList.map((item) => {
    const remainingSpot = item?.teamCount - item?.userDetail?.length;

    return { ...item, remainingSpot };
  });
  return res.status(200).send({
    message: "Lobby list is displayed successfully.",
    recruitList: newRecruitList,
  });
});

export default router;
