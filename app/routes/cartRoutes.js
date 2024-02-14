import { Router } from "express";
import cart from "../controllers/cartController.js";

const router = Router();

router.post("/", cart.addToCart);
router.get("/", cart.getCart);
router.delete("/:id", cart.deleteItemCart);
router.put("/:id", cart.changeQuantity);

export default router;
