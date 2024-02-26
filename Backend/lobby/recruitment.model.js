import mongoose from "mongoose";

// set rules
const recruitmentSchema = new mongoose.Schema(
  {
    lobbyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "lobby",
    },
    recruiterId: {
      // userId
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    role: {
      type: String,
      enum: ["singer", "dancer", "comedy", "experienced  hiker"],
      required: false,
    },
    // requirements: {
    //   type: String,
    // },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// create table
const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

export default Recruitment;
