import mongoose from "mongoose";

// set of schema

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "users",
  },
  sellerId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "users",
  },
  productId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "products",
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  orderQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  subTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: [
      "Completed",
      "Pending",
      "Expired",
      "Initiated",
      "Refunded",
      "User canceled",
      "Partially Refunded",
    ],
  },

  pidx: {
    type: String,
    required: true,
    trim: true,
  },
});

// create table
const Order = mongoose.model("Order", orderSchema);
export default Order;
