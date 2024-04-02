import mongoose from "mongoose";

// set rule
const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 55,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 55,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Bagpacks",
        "Trekking Poles",
        "Water Bottles & Filters",
        "Watches",
        "Camp Kitchen",
        "Headwear",
        "Climbing Equipment",
        "Eyewear",
        "Footwear",
        "Gloves",
        "Knives & Multitool",
        "Clothes",
      ],
    },
    freeShipping: {
      type: Boolean,
      required: false,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    image: {
      type: String,
      required: false,
      default: null,
      trim: true,
    },
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

// create table
const Product = mongoose.model("Product", productSchema);

export default Product;
