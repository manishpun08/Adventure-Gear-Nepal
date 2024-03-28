import express from "express";
import Admin from "./admin.model.js";
import { loginAdminValidationSchema } from "./admin.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminReqBodyValidation } from "../middleware/reqBodyAdmin.middleware.js";
import { generateHashPassword } from "../utils/password.function.js";
import { isAdmin } from "../middleware/authentication.middleware.js";
import Product from "../product/product.model.js";
import User from "../user/user.model.js";

const router = express.Router();

// register admin
router.post(
  "/admin/register",
  // for validation
  adminReqBodyValidation,
  // for adding new admin
  async (req, res) => {
    // extract new admin from req.body
    const newAdmin = req.body;
    // find admin using email
    const admin = await Admin.findOne({ email: newAdmin.email });
    // if admin, throw error,
    if (admin) {
      return res
        .status(409)
        .send({ message: "Admin with this email already exists" });
    }
    // hash password
    const hashedPassword = await generateHashPassword(newAdmin.password);
    newAdmin.password = hashedPassword;

    // create admin
    await Admin.create(newAdmin);
    // send response
    return res
      .status(201)
      .send({ message: "Admin is registered successfully." });
  }
);

// login admin
router.post(
  "/admin/login",
  // validation
  async (req, res, next) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    // validate
    try {
      const validatedData = await loginAdminValidationSchema.validate(
        loginCredentials
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },

  // for login admin
  async (req, res) => {
    // extract login credential from req.body
    const loginCredentials = req.body;

    // find admin using email
    const admin = await Admin.findOne({ email: loginCredentials.email });

    // if no admin, throw error
    if (!admin) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    // check for password match
    const isPassword = await bcrypt.compare(
      loginCredentials.password,
      admin.password
    );

    // if not password match, throw error
    if (!isPassword) {
      if (admin) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }
    }

    // generate token
    let payload = { adminId: admin._id };
    const token = jwt.sign(
      payload,
      "495de14aa86115fb4ef7c79e4b5838e9d88ae5a51a46758b8d5ba0fdc53dc272da60c8613341c48b619ac88e5896956b40d1bf93ddcf5b0185ba58fc87bd0c7e",
      {
        expiresIn: "1d",
      }
    );

    // send res
    return res
      .status(200)
      .send({ message: "success", admin: admin, token: token });
  }
);

// get admin dashboard
router.get(
  "/admin/dashboard",

  // authenticating admin
  isAdmin,

  // getting admin dashboard function
  async (_, res) => {
    const totalProducts = await Product.countDocuments();
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const latest4Products = await Product.find().sort({ _id: -1 }).limit(4);
    const categProductsCount = await Product.find().then((products) =>
      products.reduce((acc, cur) => {
        const categEntryIndex = acc.findIndex((c) => c.name == cur.category);
        if (categEntryIndex == -1) {
          acc.push({ name: cur.category, count: 1 });
        } else {
          acc[categEntryIndex].count++;
        }

        return acc;
      }, [])
    );

    // send dashboard data as response
    return res.status(200).send({
      message: "success",
      dashboard: {
        totalProducts,
        totalSellers,
        totalBuyers,
        latest4Products,
        categProductsCount,
      },
    });
  }
);

// get all products
router.get(
  "/admin/products",

  // authenticating admin
  isAdmin,

  // getting admin all products function
  async (_, res) => {
    const allProducts = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "sellerId",
          foreignField: "_id",
          as: "seller",
        },
      },
    ]);

    // send all products data as response
    return res.status(200).send({
      message: "success",
      allProducts,
    });
  }
);

export default router;
