import { Router } from "express";
import { login } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/authMiddlewares.js";

const router = Router();

router.post("/", validateLogin, login);

export default router;
