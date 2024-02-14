import { Router } from "express";
import product from "../controllers/productController.js";
import validateSeller from "../middlewares/sellerMiddlewares.js";

const router = Router();

// router.post("/", validateSeller, product.createProduct);
router.post("/", product.createProduct);
router.get("/", product.allProduct);
router.get("/:id", product.getProductbyId);
router.delete("/:id", product.deleteProduct);

export default router;
