import mongoose from "mongoose";

// set rules
const recruitmentSchema = new mongoose.Schema(
  {
    // recruiterId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "users",
    // },

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
      min: 1000000000,
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
    memberIds: {
      type: [mongoose.ObjectId],
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

// create table
const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

export default Recruitment;
