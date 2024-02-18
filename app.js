import express from "express";
import auth from "./app/routes/authRoutes.js";
import product from "./app/routes/productRoutes.js";
import login from "./app/routes/loginRoutes.js";
import cart from "./app/routes/cartRoutes.js";
import order from "./app/routes/orderRoutes.js";
import payment from "./app/routes/paymentRoutes.js";

const app = express();
app.use(express.json());

app.use("/login", login);
app.use("/signup", auth);
app.use("/product", product);
app.use("/cart", cart);
app.use("/order", order);
app.use("/payment", payment);

export default app;
