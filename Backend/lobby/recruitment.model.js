import mongoose from "mongoose";

// set rules
const recruitmentSchema = new mongoose.Schema(
  {
    // lobbyId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "lobby",
    // },
    // recruiterId: {
    //   // userId
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "users",
    // },

    destination: {
      type: String,
      required: true,
    },

    adventureType: {
      type: String,
      required: true,
      trim: true,
      enum: ["trek", "camp"],
    },

    teammatesCount: {
      type: Number,
      default: "1",
      required: true,
    },

    timePeriod: {
      type: Date,
      required: false,
      default: null,
    },

    requirement: {
      type: String,
      trim: true,
      required: true,
    },

    contactNumber: {
      type: Number,
      required: true,
      minLength: 10,
    },

    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 50,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// create table
const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

export default Recruitment;
