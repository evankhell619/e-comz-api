import { Router } from "express";
import order from "../controllers/orderController.js";
import authToken from "../middlewares/tokenMiddlewares.js";

const router = Router();
router.use(authToken);

router.post("/", order.addOrder);
router.get("/", order.getOrder);

export default router;
