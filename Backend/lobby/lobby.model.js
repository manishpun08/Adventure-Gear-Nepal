import mongoose from "mongoose";

// set rules
const lobbySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// create table
const Lobby = mongoose.model("Lobby", lobbySchema);

export default Lobby;
