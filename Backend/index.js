import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import productRoutes from "./product/product.routes.js";
import cartRoutes from "./cart/cart.route.js";
import cors from "cors";

// my app
const app = express();

// to make app understand json
app.use(express.json());

// cors
app.use(cors());

// connect db
connectDB();

// register routes
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

// port and server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
