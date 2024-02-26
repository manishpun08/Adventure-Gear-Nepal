import mongoose from "mongoose";

// set rule
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
        "Compass & Binoculars",
        "Watches",
        "Camp Furniture",
        "Camp Kitchen",
        "Headwear",
        "Climbing Equipment",
        "Eyewear",
        "Footwear",
        "Gloves",
        "Headlamps & Lanterns",
        "Knives & Multitool",
        "Organizer",
        "Personal Care",
        "Sleep Bags",
        "Solar Panels & Power Banks",
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
  },
  {
    timestamps: true,
  }
);

// create table
const Product = mongoose.model("Product", productSchema);

export default Product;
