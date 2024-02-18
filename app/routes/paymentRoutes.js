import { Router } from "express";
import payment from "../controllers/paymentController.js";
import authToken from "../middlewares/tokenMiddlewares.js";

const router = Router();
router.use(authToken);

router.post("/", payment.addPayment);

export default router;
