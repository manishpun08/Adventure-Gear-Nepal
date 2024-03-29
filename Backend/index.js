import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.routes.js";
import adminRoutes from "./admin/admin.routes.js";
import productRoutes from "./product/product.routes.js";
import cartRoutes from "./cart/cart.route.js";
import cors from "cors";
import paymentRoutes from "./payment/paymentRoutes.js";
import orderRoutes from "./order/order.routes.js";
import recruitRoutes from "./lobby/recruit.router.js";
import resetPasswordRoutes from "./forget-password/reset.password.routes.js";

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
app.use(adminRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);
app.use(recruitRoutes);
app.use(resetPasswordRoutes);

// port and server
const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
