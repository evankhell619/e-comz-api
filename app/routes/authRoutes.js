import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { validateSignup } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/", validateSignup, signUp);

export default router;
