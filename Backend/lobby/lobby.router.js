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

    await Lobby.create(values);

    return res
      .status(200)
      .send({ message: "Lobby is created successfully", values });
  }
);

// Add member to lobby by id
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
    lobby.group.push(loggedInUserId);

    // Save the updated lobby document
    const updatedLobby = await lobby.save();

    console.log(updatedLobby);
    console.log("User added to lobby successfully.");
    return res.status(200).send({
      message: "User is added to the lobby successfully.",
      updatedLobby,
    });
  } catch (error) {
    console.error("Error adding user to lobby:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
});

// Remove member from lobby by id
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
    lobby.group.pull(loggedInUserId);

    // Save the updated lobby document
    const updatedLobby = await lobby.save();

    console.log("User removed from lobby successfully.");
    return res.status(200).send({
      message: "User is removed from the lobby successfully.",
      updatedLobby,
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
        adventure: 1,
        teamCount: 1,
        date: 1,
        requirement: 1,
        contactNumber: 1,
        description: 1,
        image: 1,
        lobbyExpireAt: 1,
        userData: {
          firstName: { $first: "$userDetail.firstName" },
          lastName: { $first: "$userDetail.lastName" },
          email: { $first: "$userDetail.email" },
        },
      },
    },
  ]);

  console.log(recruitList);
  return res.status(200).send({
    message: "Lobby list is displayed successfully.",
    recruitList,
  });
});

export default router;
