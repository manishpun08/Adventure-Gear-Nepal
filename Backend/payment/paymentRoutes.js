import express from "express";
import { isBuyer } from "../middleware/authentication.middleware.js";
import axios from "axios";
import { generateRandomString } from "../utils/generate.random.string.js";
import Order from "../order/order.model.js";
import Cart from "../cart/cart.model.js";
import mongoose from "mongoose";
import { array } from "yup";

const router = express.Router();

// Initiate payment
router.post("/payment/khalti/start", isBuyer, async (req, res) => {
  const { amount, productList } = req.body;
  const purchaseOrderId = generateRandomString();

  try {
    // Initiate payment with Khalti
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/payment/khalti/success",
        website_url: "http://localhost:5173/",
        amount: Number(amount) * 100, // Convert to paisa
        purchase_order_id: purchaseOrderId,
        purchase_order_name: `item-${purchaseOrderId}`,
      },
      {
        headers: {
          Authorization: "key 14947c13cf064858b6628d9b95f28f05",
          "Content-Type": "application/json",
        },
      }
    );

    // Create order in the database
    // array maa multiple promise xa vane promise.all
    await Promise.all(
      productList.map(async (item) => {
        await Order.create({
          buyerId: req.loggedInUserId,
          sellerId: new mongoose.Types.ObjectId(item?.sellerId), // convert id into mongoID
          productId: new mongoose.Types.ObjectId(item?.productId),
          orderQuantity: item?.orderQuantity,
          unitPrice: item?.unitPrice,
          subTotal: item?.subTotal,
          paymentStatus: "Initiated",
          pidx: khaltiResponse?.data?.pidx,
        });
      })
    );

    // Send success response to the client
    return res.status(200).send({
      message: "Khalti Payment initiation successful",
      paymentDetails: khaltiResponse?.data,
    });
  } catch (error) {
    console.error("Error initiating Khalti payment:", error);
    return res
      .status(400)
      .send({ message: "Khalti Payment initiation failed" });
  }
});

// Verify payment
router.post("/payment/khalti/verify", isBuyer, async (req, res) => {
  const { pidx } = req.body;

  try {
    // Verify payment status with Khalti
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: "key 14947c13cf064858b6628d9b95f28f05",
          "Content-Type": "application/json",
        },
      }
    );

    // Update order payment status in the database
    await Order.updateMany(
      { pidx },
      {
        $set: {
          paymentStatus: khaltiResponse?.data?.status,
        },
      }
    );

    console.log(khaltiResponse);
    // If payment status is not completed
    if (khaltiResponse?.data?.status !== "Completed") {
      return res.status(400).send({ message: "Khalti Payment status failed" });
    }

    // Delete cart items after successful transaction
    await Cart.deleteMany({ buyerId: req.loggedInUserId });

    return res.status(200).send({ message: "Khalti payment is successful" });
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    return res
      .status(400)
      .send({ message: "Khalti Payment verification failed" });
  }
});

export default router;
