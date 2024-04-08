import express from "express";
import Product from "./product.model.js";
import {
  isBuyer,
  isSeller,
  isUser,
  isAdmin,
} from "../middleware/authentication.middleware.js";
import { productReqBodyValidation } from "../middleware/reqBody.Product.middleware.js";
import { checkMongoIdFromParams } from "../middleware/mongo.id.validity.middleware.js";
import { paginationValidationSchema } from "../middleware/pagination.validation.middleware.js";
import Cart from "../cart/cart.model.js";
import Order from "../order/order.model.js";
import Category from "./product-category.model.js";

const router = express.Router();

// add product, system user, role => seller
router.post(
  "/product/add",
  // authenticate if the user is seller or not
  isSeller,
  // validation for product
  productReqBodyValidation,
  // add new product
  async (req, res) => {
    // extract new product from req.body
    const newProduct = req.body;
    // add sellerId
    newProduct.sellerId = req.loggedInUserId;
    // create product
    await Product.create(newProduct);
    // send response
    return res.status(201).send({ message: "Product is added successfully." });
  }
);

// get product details
router.get(
  "/product/details/:id",

  // authenticating user
  isUser,

  // validating mongo id
  checkMongoIdFromParams,

  // getting product details function
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId }).populate({
      path: "ratings.user",
    });
    // if not product throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exits." });
    }
    // send product as response
    return res
      .status(200)
      .send({ message: "success", productDetails: product });
  }
);

// get if the current user has purchased the given product
router.get(
  "/product/has-purchased/:id",

  // authenticating user
  isUser,

  // validating mongo id
  checkMongoIdFromParams,

  // getting product details function
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId }).populate({
      path: "ratings.user",
    });
    // if not product throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exits." });
    }
    const hasUserPurchasedProduct = await Order.exists({
      buyerId: req.loggedInUserId,
      productId: productId,
      paymentStatus: "Completed",
    });
    // send product as response
    return res.status(200).send({
      message: "success",
      hasUserPurchasedProduct: !!hasUserPurchasedProduct,
    });
  }
);

// add product review
router.post(
  "/product/review/:id",

  // authenticating user
  isUser,

  // validating mongo id
  checkMongoIdFromParams,

  // getting product details function
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // add review to the product reviews array
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        $push: {
          ratings: {
            user: req.loggedInUserId,
            value: req.body.value,
            title: req.body.title,
            body: req.body.body,
          },
        },
      }
    );
    // send success response
    return res.status(201).send();
  }
);

// delete product
router.delete(
  "/product/delete/:id",

  // authenticating seller only
  isSeller,

  // validating mongo id
  checkMongoIdFromParams,

  // deleting product function
  async (req, res) => {
    // check product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }

    //? check for owner of product
    // loggedInUserId must be same with product's sellerId
    const isOwnerOfProduct = product.sellerId.equals(req.loggedInUserId);

    // if not owner of product, throw error
    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You are not owner of this product." });
    }
    // delete product
    await Product.deleteOne({ _id: productId });

    // delete cart
    await Cart.deleteMany({ productId });

    // send proper response
    return res
      .status(200)
      .send({ message: "Product is deleted successfully." });
  }
);

// edit product
router.put(
  "/product/edit/:id",

  // authenticating seller only
  isSeller,

  // validating mongo id
  checkMongoIdFromParams,

  // validate product
  productReqBodyValidation,

  // edit product function
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
    // check for ownership of product
    const isOwnerOfProduct = product.sellerId.equals(req.loggedInUserId);
    // if not owner, throw error
    if (!isOwnerOfProduct) {
      return res
        .status(403)
        .send({ message: "You are not owner of this product." });
    }
    // extract new values from req.body
    const newValues = req.body;
    // edit product
    await Product.updateOne(
      { _id: productId },
      {
        $set: {
          ...newValues,
        },
      }
    );
    // send response
    return res
      .status(200)
      .send({ message: "Product is updated successfully." });
  }
);

// get product list by buyer
router.post(
  "/product/list/buyer",
  isBuyer,
  // validating pagination data
  async (req, res, next) => {
    // extract pagination data from req.body
    const paginationData = req.body;

    // validate pagination data
    try {
      const validatedData = await paginationValidationSchema.validate(
        paginationData
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  // pagination function
  async (req, res) => {
    // extract pagination data from req.body
    const { page, limit, searchText, category, minPrice, maxPrice } = req.body;

    // for searching product
    let match = {};

    if (searchText) {
      match = { ...match, name: { $regex: searchText, $options: "i" } };
    }

    // for filtering
    if (category) {
      match = { ...match, category: category };
    }
    if (minPrice >= 0 && maxPrice) {
      match = { ...match, price: { $gte: minPrice, $lte: maxPrice } };
    }
    // calculate skip
    const skip = (page - 1) * limit;

    //run query
    const productList = await Product.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          description: { $substr: ["$description", 0, 150] },
          image: 1,
        },
      },
    ]);
    const totalProducts = await Product.find(match).countDocuments();
    const numberOfPages = Math.ceil(totalProducts / limit);

    return res
      .status(200)
      .send({ message: "success", productList: productList, numberOfPages });
  }
);

// get product list by seller
router.post(
  "/product/list/seller",

  isSeller,

  // validating pagination data
  async (req, res, next) => {
    // extract pagination data from req.body
    const paginationData = req.body;

    // validate pagination data
    try {
      const validatedData = await paginationValidationSchema.validate(
        paginationData
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },

  // pagination function
  async (req, res) => {
    // extract pagination data from req.body
    const { page, limit, category, searchText, minPrice, maxPrice } = req.body;

    let match = { sellerId: req.loggedInUserId };
    // for searching product

    if (searchText) {
      match = { ...match, name: { $regex: searchText, $options: "i" } };
    }

    // for filtering
    if (category) {
      match = { ...match, category: category };
    }
    if (minPrice >= 0 && maxPrice) {
      match = { ...match, price: { $gte: minPrice, $lte: maxPrice } };
    }
    // calculate skip
    const skip = (page - 1) * limit;

    // run query
    const productList = await Product.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          description: { $substr: ["$description", 0, 150] },
          image: 1,
        },
      },
    ]);
    // for pagination
    const totalProducts = await Product.find(match).countDocuments();
    const numberOfPages = Math.ceil(totalProducts / limit);

    return res
      .status(200)
      .send({ message: "success", productList: productList, numberOfPages });
  }
);

// get latest product
router.get("/product/list/latest", async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {},
    },
    {
      $sort: { createdAt: -1 },
    },
    { $limit: 5 },
    {
      $project: {
        image: 1,
        name: 1,
        price: 1,
        brand: 1,
      },
    },
  ]);

  return res.status(200).send({ message: "success", latestProducts: products });
});

// get possible categories admin
router.get("/product/categories", async (req, res) => {
  const categories = await Category.find({});
  return res.status(200).send({ message: "success", categories });
});

// add new categories by admin
router.post("/product/categories", async (req, res) => {
  const category = new Category({
    title: req.body.title,
  });
  await category.save();
  return res.status(201).send({ message: "success", category });
});

// delete categories by admin
router.delete("/product/categories/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  return res.status(200).send({ message: "success" });
});

// get category list
router.get("/product/category/list", async (req, res) => {
  const categoryList = await Product.aggregate([
    { $match: {} },

    {
      $sort: {
        category: 1,
      },
    },

    {
      $project: {
        category: 1,
        image: 1,
      },
    },
  ]);

  // A  New Set is a collection of unique values, meaning it cannot contain duplicate elements.
  const uniqueIdsSet = new Set();
  // This line creates a new array
  const uniqueCategories = categoryList.filter((item) => {
    // .has checks if the uniqueIdsSet
    if (!uniqueIdsSet.has(item.category)) {
      // If the category is unique, this line adds it to the uniqueIdsSet
      uniqueIdsSet.add(item.category);
      return true;
    }
    return false;
  });

  return res.status(200).send({ message: "Success", uniqueCategories });
});

// get product by category
router.get(
  "/product/category-list/:id",
  checkMongoIdFromParams,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findById(productId);
    // if not product throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
    const productInSameCategory = await Product.find({
      category: product.category,
    });

    res.status(200).send({ message: "Success", productInSameCategory });
  }
);

export default router;
