import express from "express";
import { isSeller } from "../middleware/authentication.middleware.js";
import Order from "./order.model.js";

const router = express.Router();

// get order list by seller
router.get("/order/list", isSeller, async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: {
        sellerId: req.loggedInUserId,
        paymentStatus: "Completed",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "buyerId",
        foreignField: "_id",
        as: "buyerDetail",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetail",
      },
    },
    {
      $project: {
        unitPrice: 1,
        orderQuantity: 1,
        subTotal: 1,
        paymentStatus: 1,
        buyerData: {
          firstName: { $first: "$buyerDetail.firstName" },
          lastName: { $first: "$buyerDetail.lastName" },
          email: { $first: "$buyerDetail.email" },
        },
        productData: {
          name: { $first: "$productDetail.name" },
          brand: { $first: "$productDetail.brand" },
          category: { $first: "$productDetail.category" },
        },
      },
    },
  ]);

  return res.status(200).send({ message: "success", orderList: orders });
});
export default router;
