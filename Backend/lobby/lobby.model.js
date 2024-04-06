import mongoose from "mongoose";

// set rules
const lobbySchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    adventure: {
      type: String,
      required: true,
      trim: true,
      enum: ["Trek", "Camp"],
    },

    teamCount: {
      type: Number,
      default: "1",
      required: false,
    },

    date: {
      type: Date,
      required: true,
    },

    requirement: {
      type: String,
      trim: true,
      required: true,
    },

    contactNumber: {
      type: Number,
      required: true,
      min: 10,
    },

    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 50,
      maxLength: 500,
    },
    image: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    group: {
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds representing users
      default: [], // Default value is an empty array
    },
    lobbyExpireAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

// create table
const Lobby = mongoose.model("Lobby", lobbySchema);

export default Lobby;
